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

// Get logged-in user's watchlist (Controller)
const getMyWatchlist = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userId = user.id || user.userId;

    const result = await WatchlistService.getMyWatchlistFromDB(userId);

    res.status(200).json({
      success: true,
      message: "Watchlist retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve watchlist",
    });
  }
};

// Remove media from watchlist (Controller)
const removeFromWatchlist = async (req: Request, res: Response) => {
  try {
    const watchlistId = req.params.id as string;
    const user = (req as any).user;

    const result = await WatchlistService.removeFromWatchlistFromDB(
      watchlistId,
      user,
    );

    res.status(200).json({
      success: true,
      message: "Media removed from watchlist successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to remove media from watchlist",
    });
  }
};

// Get watchlist count for a specific media (Controller)
const getWatchlistCountByMediaId = async (req: Request, res: Response) => {
  try {
    const mediaId = req.params.mediaId as string;

    const result =
      await WatchlistService.getWatchlistCountByMediaIdFromDB(mediaId);

    res.status(200).json({
      success: true,
      message: "Watchlist count retrieved successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve watchlist count",
    });
  }
};

export const WatchlistController = {
  addToWatchlist,
  getMyWatchlist,
  removeFromWatchlist,
  getWatchlistCountByMediaId,
};
