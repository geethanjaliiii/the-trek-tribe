import { z } from "zod";

// Zod schema for VendorRegistrationDto
export const vendorVerificationnSchema = z.object({
  // Personal Details
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .nonempty("Full name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits")
    .nonempty("Phone number is required"),
  additionalContactNumber: z
    .string()
    .regex(/^\d{10}$/, "Additional contact number must be 10 digits")
    .optional()
    .nullable(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(), // Add this if password is optional, or make it required with .nonempty()

  // Business Details
  businessName: z.string().nonempty("Business name is required"),
  businessDescription: z
    .string()
    .min(50, "Business description must be at least 50 characters")
    .nonempty("Business description is required"),
  registrationNumber: z.string().nonempty("Registration number is required"),
  businessType: z.string().nonempty("Business type is required"),

  // Documents
  businessDocuments: z
    .array(z.string().nonempty("Each document must be a valid string"))
    .min(1, "At least one business document is required"),
  ownerIdProof: z.string().nonempty("Owner ID proof is required"),
  businessLogo: z.string().nonempty("Business logo is required"),

  // Location & Contact Details
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  country: z.string().nonempty("Country is required"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be 6 digits")
    .nonempty("Pincode is required"),
  website: z.string().optional().nullable(),
  socialMediaLinks: z
    .array(z.string())
    .optional()
    // Added nullable() to allow null array
});

// Type inference for TypeScript
export type VendorRegistrationDto = z.infer<typeof vendorVerificationnSchema>;
// import { z } from "zod";

// // Zod schema for VendorRegistrationDto
// export const vendorVerificationnSchema = z.object({
//   // Personal Details
//   fullName: z
//     .string()
//     .min(2, "Full name must be at least 2 characters")
//     .nonempty("Full name is required"),
//   email: z.string().email("Invalid email address").nonempty("Email is required"),
//   phoneNumber: z
//     .string()
//     .regex(/^\d{10}$/, "Phone number must be 10 digits")
//     .nonempty("Phone number is required"),
//   additionalContactNumber: z
//     .string()
//     .regex(/^\d{10}$/, "Additional contact number must be 10 digits")
//     .optional()
//     .nullable(),

//   // Business Details
//   businessName: z.string().nonempty("Business name is required"),
//   businessDescription: z
//     .string()
//     .min(50, "Business description must be at least 50 characters")
//     .nonempty("Business description is required"),
//   registrationNumber: z.string().nonempty("Registration number is required"),
//   businessType: z.string().nonempty("Business type is required"),

//   // Documents
//   businessDocuments: z
//     .array(z.string().nonempty("Each document must be a valid string"))
//     .min(1, "At least one business document is required"),
//   ownerIdProof: z.string().nonempty("Owner ID proof is required"),
//   businessLogo: z.string().nonempty("Business logo is required"), // Fixed typo from "businnessLogo"

//   // Location & Contact Details
//   address: z.string().nonempty("Address is required"),
//   city: z.string().nonempty("City is required"),
//   state: z.string().nonempty("State is required"),
//   country: z.string().nonempty("Country is required"),
//   pincode: z
//     .string()
//     .regex(/^\d{6}$/, "Pincode must be 6 digits")
//     .nonempty("Pincode is required"),
//   website: z.string().url("Must be a valid URL").optional().nullable(),
//   socialMediaLinks: z
//     .array(z.string().url("Each social media link must be a valid URL"))
//     .optional()
    
// });

// // Type inference for TypeScript
// export type VendorRegistrationDto = z.infer<typeof vendorVerificationnSchema>;