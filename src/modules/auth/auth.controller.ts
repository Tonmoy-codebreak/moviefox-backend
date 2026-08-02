import type { Request, Response } from "express";
import { loginUser, registerUserService } from "./auth.service.js";

// Register controller
export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await registerUserService(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Something went wrong",
    });
  }
};

// Log In controller
// Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    // ১. req.body থেকে ইমেইল ও পাসওয়ার্ড রিসিভ করে সার্ভিসে পাস করা হচ্ছে
    const result = await loginUser(req.body);

    // ২. সাকসেসফুল রেসপন্স ক্লায়েন্টে পাঠানো হচ্ছে
    res.status(200).json({
      success: true,
      message: "Login successful!",
      data: result,
    });
  } catch (error: any) {
    // ৩. কোনো এরর হলে সেটি হ্যান্ডেল করা হচ্ছে
    res.status(400).json({
      success: false,
      error: error.message || "Invalid credentials!",
    });
  }
};
