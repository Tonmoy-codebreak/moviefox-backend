import { z } from "zod";

const createWatchlistValidation = z.object({
  body: z.object({
    mediaId: z.string({
      message: "Media ID is required",
    }),
  }),
});

export const WatchlistValidation = {
  createWatchlistValidation,
};
