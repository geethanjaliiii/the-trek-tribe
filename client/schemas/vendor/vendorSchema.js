import * as Yup from 'yup';

export const vendorSchema = Yup.object({
    businessName: Yup.string()
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