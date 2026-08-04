import { Router, type IRouter } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { CompletedMediaValidation } from "./completedmedia.validation";
import { CompletedMediaController } from "./completedmedia.controller";

const router: IRouter = Router();

// adding media to completed list
router.post(
  "/",
  authMiddleware("USER", "ADMIN"),
  validateRequest(CompletedMediaValidation.createCompletedMediaValidation),
  CompletedMediaController.addToCompletedList,
);

// whole completed list access by logged in user

// Remove media from completed list

export default router;
