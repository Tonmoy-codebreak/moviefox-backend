import type { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const result = await ReviewService.createReviewIntoDB({
      userId,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message:
        "Review submitted successfully! It is pending for admin approval.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create review",
    });
  }
};

export const ReviewController = {
  createReview,
};
