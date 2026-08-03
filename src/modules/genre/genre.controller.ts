import type { Request, Response } from "express";
import { GenreService } from "./genre.service";

// Create Genre (Controller)
const createGenre = async (req: Request, res: Response) => {
  try {
    const result = await GenreService.createGenreIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Genre created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create genre",
      error,
    });
  }
};

// Get All Genres (Controller)
const getAllGenres = async (req: Request, res: Response) => {
  try {
    const result = await GenreService.getAllGenresFromDB();

    res.status(200).json({
      success: true,
      message: "Genres retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch genres",
      error,
    });
  }
};

// Get Single Genre details from DB (Controller)
const getSingleGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await GenreService.getSingleGenreFromDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Genre fetched successfully with movies!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch genre",
      error,
    });
  }
};

export const GenreController = {
  createGenre,
  getAllGenres,
  getSingleGenre,
};
