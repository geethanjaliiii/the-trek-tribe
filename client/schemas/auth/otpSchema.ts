import * as Yup from "yup";
export const otpSchema = Yup.object({
    otp: Yup.string()
    .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
    .required('OTP is required.')
    })