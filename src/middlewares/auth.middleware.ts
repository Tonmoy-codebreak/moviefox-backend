import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized access! No token provided.",
      });
    }

    // Separating Bearer and the token
    const token = authHeader.split(" ")[1]!;

    // Token verify
    const secretKey = process.env.JWT_SECRET || "supersecretkey";
    const decoded = jwt.verify(token, secretKey);

    // user object for controller
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token!",
    });
  }
};
