import { Router, type IRouter } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createGenreValidationSchema } from "./genre.validation";
import { GenreController } from "./genre.controller";

const router: IRouter = Router();

// Create Genre Route
router.post(
  "/",
  validateRequest(createGenreValidationSchema),
  GenreController.createGenre,
);

// Get All Genres Route
router.get("/", GenreController.getAllGenres);

// Get Single Genre details (including media that has the genre)
router.get("/:id", GenreController.getSingleGenre);

// Update Genre Route
router.patch("/:id", GenreController.updateGenre);

export default router;
