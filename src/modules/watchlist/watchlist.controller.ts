import type { Request, Response } from "express";
import { WatchlistService } from "./watchlist.service";

// Add media to watchlist (Controller)
const addToWatchlist = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userId = user.id || user.userId;
    const { mediaId } = req.body;

    const result = await WatchlistService.addToWatchlistIntoDB(userId, mediaId);

    res.status(201).json({
      success: true,
      message: "Media added to watchlist successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add media to watchlist",
    });
  }
};

export const WatchlistController = {
  addToWatchlist,
};
