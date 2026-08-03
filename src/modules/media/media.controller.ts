import type { Request, Response } from "express";
import {
  createMediaIntoDB,
  getAllMediaFromDB,
  getSingleMediaFromDB,
} from "./media.service";

// Create new media in database (Controller)
export const createMedia = async (req: Request, res: Response) => {
  try {
    const result = await createMediaIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Media created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create media",
      error: error.message,
    });
  }
};

// Get all media (including pagination, search, sorting condition) (Controller)
export const getAllMedia = async (req: Request, res: Response) => {
  try {
    const result = await getAllMediaFromDB(req.query);

    return res.status(200).json({
      success: true,
      message: "Media fetched successfully!",
      meta: result.meta, // meta data of pagination (page, limit, total, totalPages)
      data: result.data, // full media list
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Get single media details from Db (Controller)
export const getSingleMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getSingleMediaFromDB(id as string);

    return res.status(200).json({
      success: true,
      message: "Media fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "Media not found!",
    });
  }
};
