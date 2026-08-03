import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    mediaId: z.string({
      message: "Media ID is required",
    }),
    rating: z
      .number({
        message: "Rating is required",
      })
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
    hasSpoiler: z.boolean().optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
};
