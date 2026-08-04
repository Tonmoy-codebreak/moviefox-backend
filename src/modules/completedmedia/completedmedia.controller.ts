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

// whole completed list access by logged in user (Controller)
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

export const CompletedMediaController = {
  addToCompletedList,
  getMyCompletedList,
};
