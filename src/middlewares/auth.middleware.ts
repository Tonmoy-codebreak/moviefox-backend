import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // ১. রিকোয়েস্টের headers থেকে Authorization টোকেন নেওয়া
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized access! No token provided.",
      });
    }

    // ২. "Bearer <token>" থেকে শুধু টোকেন অংশটুকু আলাদা করা
    const token = authHeader.split(" ")[1]!;

    // ৩. টোকেন ভেরিফাই করা
    const secretKey = process.env.JWT_SECRET || "supersecretkey";
    const decoded = jwt.verify(token, secretKey);

    // ৪. ডিকোড করা ইউজার ইনফো রিকোয়েস্ট অবজেক্টে জুড়ে দেওয়া, যাতে কন্ট্রোলার থেকে অ্যাক্সেস করা যায়
    (req as any).user = decoded;

    // ৫. পরবর্তী কাজ বা কন্ট্রোলারে যাওয়ার অনুমতি দেওয়া
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token!",
    });
  }
};
