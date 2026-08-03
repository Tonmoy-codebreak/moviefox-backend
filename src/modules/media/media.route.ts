import { Router, type IRouter } from "express";
import { createMedia } from "./media.controller";

import { validateRequest } from "../../middlewares/validaterequest";
import { createMediaValidationSchema } from "./media.validation";

const router: IRouter = Router();

// Create a new media
router.post("/", validateRequest(createMediaValidationSchema), createMedia);

// Get all media (Browse/List)
// router.get("/");

// Get a single media by ID or Slug
// router.get("/:id");

// Update a media
// router.patch("/:id");

// Delete a media
// router.delete("/:id");

export default router;
