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

// Review Deletion (User or Admin can delete a review in any status)
router.delete(
  "/:id",
  authMiddleware("USER", "ADMIN"),
  ReviewController.deleteReview,
);

export default router;
