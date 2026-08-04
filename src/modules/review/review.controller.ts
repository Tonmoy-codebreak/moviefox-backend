import type { Request, Response } from "express";
import { ReviewService } from "./review.service";

// Create Review (Controller)
const createReview = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

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

// Delete Review (Controller)
const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id as string;
    const user = (req as any).user;

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

// Get all reviews for specific media (Controller)
const getReviewsByMediaId = async (req: Request, res: Response) => {
  try {
    const mediaId = req.params.mediaId as string;
    const result = await ReviewService.getReviewsByMediaIdFromDB(mediaId);

    res.status(200).json({
      success: true,
      message: "Media reviews fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong!",
    });
  }
};

// Get all pending reviews (Controller)
const getPendingReviews = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getPendingReviewsFromDB();

    res.status(200).json({
      success: true,
      message: "Pending reviews retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve pending reviews",
    });
  }
};

// Approve a review by Admin (Controller)
const approveReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await ReviewService.approveReviewIntoDB(id);

    res.status(200).json({
      success: true,
      message: "Review approved and published successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to approve review",
    });
  }
};

// Get reviews created by the logged-in user (Controller)
const getMyReviews = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userId = user.id || user.userId;

    const result = await ReviewService.getMyReviewsFromDB(userId);

    res.status(200).json({
      success: true,
      message: "My reviews retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve reviews",
    });
  }
};

export const ReviewController = {
  createReview,
  deleteReview,
  getReviewsByMediaId,
  getPendingReviews,
  approveReview,
  getMyReviews,
};
