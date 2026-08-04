import { z } from "zod";

const createCompletedMediaValidation = z.object({
  body: z.object({
    mediaId: z.string({
      message: "Media ID is required",
    }),
  }),
});

export const CompletedMediaValidation = {
  createCompletedMediaValidation,
};
