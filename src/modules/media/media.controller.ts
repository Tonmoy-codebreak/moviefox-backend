import type { Request, Response } from "express";
import { createMediaIntoDB } from "./media.service";

// Create new media in database
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
