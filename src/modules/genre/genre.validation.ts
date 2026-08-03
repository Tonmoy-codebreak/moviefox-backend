import { z } from "zod";

// Genre Create Validation Schema
export const createGenreValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: "Genre name must be a string",
      })
      .min(1, { message: "Genre name cannot be empty" }),
  }),
});
