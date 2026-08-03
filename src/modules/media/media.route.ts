import { Router, type IRouter } from "express";
import { createMedia, getAllMedia } from "./media.controller";

import { validateRequest } from "../../middlewares/validaterequest";
import { createMediaValidationSchema } from "./media.validation";

const router: IRouter = Router();

// Create a new media
router.post("/", validateRequest(createMediaValidationSchema), createMedia);

// Get all media (including pagination, search, sorting condition)
router.get("/", getAllMedia);

// Get a single media by ID
// router.get("/:id");

// Update a media
// router.patch("/:id");

// Delete a media
// router.delete("/:id");

export default router;
