import { z } from "zod";
import { passwordSchema } from "./password-validation.schema";
import { fullNameSchema } from "./name-validation.schema";
import { phoneNumberSchema } from "./phoneNumber.schema";
const strongEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const adminSchema = z.object({
  email: z
    .string()
    .regex(strongEmailRegex, { message: "Invalid email format." }),
  password: passwordSchema,
  role: z.literal("admin"),
});

const clientSchema = z.object({
  fullName: fullNameSchema,
  email: z
    .string()
    .trim()
    .regex(strongEmailRegex, { message: "Invalid email format." }),
  password: passwordSchema,
  role: z.literal("client"),
});

const vendorSchema = z.object({
  fullName: fullNameSchema,
  phoneNumber: phoneNumberSchema,
  email: z
    .string()
    .trim()
    .regex(strongEmailRegex, { message: "Invalid email format." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z.literal("vendor"),
});

export const userSchemas = {
  admin: adminSchema,
  client: clientSchema,
  vendor: vendorSchema,
};
