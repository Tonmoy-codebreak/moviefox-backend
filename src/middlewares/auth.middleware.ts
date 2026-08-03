import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (...requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
      const decoded = jwt.verify(token, secretKey) as any;

      // user object for controller
      (req as any).user = decoded;

      // রোল চেক করার লজিক (যদি রোল পাস করা হয়)
      if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          error:
            "Forbidden! You do not have permission to access this resource.",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token!",
      });
    }
  };
};
