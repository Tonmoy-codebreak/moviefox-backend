import { Router, type IRouter } from "express";
import {
  createMedia,
  getAllMedia,
  getSingleMedia,
  restoreMedia,
  softDeleteMedia,
  updateMedia,
} from "./media.controller";

import { validateRequest } from "../../middlewares/validaterequest";
import { createMediaValidationSchema } from "./media.validation";

const router: IRouter = Router();

// Create a new media
router.post("/", validateRequest(createMediaValidationSchema), createMedia);

// Get all media (including pagination, search, sorting condition)
router.get("/", getAllMedia);

// Get a single media details by ID
router.get("/:id", getSingleMedia);

// Update a media
router.patch("/:id", updateMedia);

// Soft Delete a media
router.delete("/:id", softDeleteMedia);

// Restore soft deleted media
router.patch("/:id/restore", restoreMedia);

export default router;
