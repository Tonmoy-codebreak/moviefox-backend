import type { Request, Response } from "express";
import {
  createMediaIntoDB,
  getAllMediaFromDB,
  getSingleMediaFromDB,
  permanentDeleteMediaFromDB,
  restoreMediaFromDB,
  softDeleteMediaFromDB,
  updateMediaIntoDB,
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

//Update Media details (Controller)
export const updateMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await updateMediaIntoDB(id as string, payload);

    return res.status(200).json({
      success: true,
      message: "Media updated successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "Failed to update media!",
    });
  }
};

// Soft Delete Media (adding Deleted at timestamp) (Controller)
export const softDeleteMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await softDeleteMediaFromDB(id as string);

    return res.status(200).json({
      success: true,
      message: "Media moved to recycle bin successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "Failed to delete media!",
    });
  }
};

// Restore soft deleted media (Controller)
export const restoreMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await restoreMediaFromDB(id as string);

    return res.status(200).json({
      success: true,
      message: "Media restored successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "Failed to restore media!",
    });
  }
};

// Permanent Delete a media from soft deleted list (Controller)
export const permanentDeleteMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await permanentDeleteMediaFromDB(id as string);

    return res.status(200).json({
      success: true,
      message: "Media deleted permanently from database!",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete media permanently!",
    });
  }
};
