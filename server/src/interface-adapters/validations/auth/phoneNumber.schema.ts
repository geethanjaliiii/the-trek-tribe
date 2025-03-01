import { z } from "zod";

export const phoneNumberSchema = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, { message: "Invalid phone number format" });
