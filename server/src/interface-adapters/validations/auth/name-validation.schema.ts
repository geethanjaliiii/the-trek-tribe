import { z } from "zod";

export const fullNameSchema = z
  .string()
  .trim() // Removes leading and trailing spaces
  .min(2, { message: "Full name must be at least 2 characters long" })
  .max(50, { message: "Full name must be at most 50 characters long" })
  .regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, {
    message: "Full name must contain only alphabetic characters and spaces",
  });
