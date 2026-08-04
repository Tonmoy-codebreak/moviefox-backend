import { Router, type IRouter } from "express";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router: IRouter = Router();

// Review Posting
router.post(
  "/",
  authMiddleware("USER", "ADMIN"),
  validateRequest(ReviewValidation.createReviewValidationSchema),
  ReviewController.createReview,
);

// Review Deletion (User and Admin only can delete)
router.delete(
  "/:id",
  authMiddleware("USER", "ADMIN"),
  ReviewController.deleteReview,
);

// Get all reviews for a specific media
router.get("/media/:mediaId", ReviewController.getReviewsByMediaId);

// Get all pending Reviews (Admin only)
router.get("/pending", ReviewController.getPendingReviews);

// Approve review by admin
router.patch("/:id/approve", ReviewController.approveReview);

// Get reviews created by the logged-in user
router.get(
  "/my-reviews",
  authMiddleware("USER", "ADMIN"),
  ReviewController.getMyReviews,
);

// Update a review

export default router;
