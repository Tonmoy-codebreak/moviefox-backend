import bcrypt from "bcrypt";
import prisma from "../../lib/prisma.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUserService = async (payload: any) => {
  const { name, email, password } = payload;

  // চেক করা ইউজার অলরেডি আছে কিনা
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists with this email!");
  }

  // পাসওয়ার্ড হ্যাশ করা
  const hashedPassword = await bcrypt.hash(password, 10);

  // ডাটাবেজে ইউজার তৈরি করা
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // পাসওয়ার্ড বাদে ইউজারের তথ্য রিটার্ন করা
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Login User
export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  // ১. ইউজার ডেটাবেজে আছে কি না চেক করা
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new Error("Invalid email or password!");
  }

  // ২. পাসওয়ার্ড ম্যাচ করছে কি না চেক করা
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password!");
  }

  // ৩. JWT টোকেন জেনারেট করা (সিক্রেট কি .env থেকে নিবে)
  const secretKey = process.env.JWT_SECRET || "supersecretkey";
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    secretKey,
    { expiresIn: "7d" },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

// Searching specific user
export const getUserProfileService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  return user;
};
