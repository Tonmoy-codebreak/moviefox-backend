import type { Request, Response } from "express";
import { CompletedMediaService } from "./completedmedia.service";

// adding media to completed list (Controller)
const addToCompletedList = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userId = user.id || user.userId;
    const { mediaId } = req.body;

    const result = await CompletedMediaService.addToCompletedListIntoDB(
      userId,
      mediaId,
    );

    res.status(201).json({
      success: true,
      message: "Media added to completed list successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add media to completed list",
    });
  }
};

// logged-in user's completed media list (Controller)
const getMyCompletedList = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userId = user.id || user.userId;

    const result = await CompletedMediaService.getMyCompletedListFromDB(userId);

    res.status(200).json({
      success: true,
      message: "Completed media list retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve completed list",
    });
  }
};

// Remove media from completed list (Controller)
const removeFromCompletedList = async (req: Request, res: Response) => {
  try {
    const completedId = req.params.id as string;
    const user = (req as any).user;

    const result = await CompletedMediaService.removeFromCompletedListFromDB(
      completedId,
      user,
    );

    res.status(200).json({
      success: true,
      message: "Media removed from completed list successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to remove media from completed list",
    });
  }
};

// Completed Count per Media (Controller)
const getCompletedCountByMediaId = async (req: Request, res: Response) => {
  try {
    const mediaId = req.params.mediaId as string;

    const result =
      await CompletedMediaService.getCompletedCountByMediaIdFromDB(mediaId);

    res.status(200).json({
      success: true,
      message: "Completed count retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve completed count",
    });
  }
};

export const CompletedMediaController = {
  addToCompletedList,
  getMyCompletedList,
  removeFromCompletedList,
  getCompletedCountByMediaId,
};
