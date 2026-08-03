import { Router, type IRouter } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createGenreValidationSchema } from "./genre.validation";
import { GenreController } from "./genre.controller";

const router: IRouter = Router();

// Create Genre Route (with Zod validation middleware)
router.post(
  "/",
  validateRequest(createGenreValidationSchema),
  GenreController.createGenre,
);

// Get All Genres Route
router.get("/", GenreController.getAllGenres);

export default router;
