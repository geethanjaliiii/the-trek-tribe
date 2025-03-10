import * as Yup from 'yup';

export const vendorSchema = Yup.object({
    fullName: Yup.string()
      .required("Business name is required")
      .min(2, "Business name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email")
      .required("Business email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  export const vendorPersonalSchema =Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be 10 digits"),
    additionalContactNumber: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").nullable(),
  })

  export const vendorBusinessSchema =Yup.object({
    businessName: Yup.string().required("Business name is required"),
    businessDescription: Yup.string().required("Business description is required").min(50, "Description must be at least 50 characters"),
    registrationNumber: Yup.string().required("Registration number is required"),
    businessType: Yup.string().required("Business type is required"),
  })

  export const vendorLocationSchema =Yup.object({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    pincode: Yup.string().required("Pincode is required").matches(/^\d{6}$/, "Pincode must be 6 digits"),
    website: Yup.string().url("Must be a valid URL").nullable(),
  });

  export const vendorDocumentSchema=  Yup.object({
    businessLogo: Yup.string().required("Business logo is required"),
    ownerIdProof: Yup.string().required("Aadhaar card is required"),
    businessDocuments: Yup.array().min(1, "At least business license is required"),
  })