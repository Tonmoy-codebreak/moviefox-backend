import type { Request, Response } from "express";
import { ReviewService } from "./review.service";

// Create Review (Controller)
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

// User delete Review (Controller)
const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id as string;
    const user = (req as any).user; // authMiddleware থেকে আসা ইউজার

    const result = await ReviewService.deleteReviewIntoDB(reviewId, user);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};

export const ReviewController = {
  createReview,
  deleteReview,
};
