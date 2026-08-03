import { z } from "zod";

export const createMediaValidationSchema = z.object({
  body: z.object({
    title: z.string({
      message: "Title is required",
    }),
    slug: z.string({
      message: "Slug is required",
    }),
    type: z.enum(["MOVIE", "SERIES", "ANIME"], {
      message: "Media type is required",
    }),
    access: z.enum(["FREE", "PREMIUM", "VIP"]).optional(),
    releaseYear: z.number({
      message: "Release year is required",
    }),
    posterUrl: z.string().url("Invalid poster URL").optional(),
    trailerUrl: z.string().url("Invalid trailer URL").optional(),
    streamingUrl: z.string().url("Invalid streaming URL").optional(),
    isPublished: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
  }),
});
