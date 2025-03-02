"use client"
import { useVerifyOTPMutation } from "@/features/api/auth/apiAuthSlice";
import { loginSuccess } from "@/features/auth/authSlice";
import { otpSchema } from "@/schemas/auth/otpSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  tempId: string;
}

function OTPModal({ isOpen, onClose, tempId }: OTPModalProps) {
  const [verifyOTP] = useVerifyOTPMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        const response = await verifyOTP({ otp: values.otp, tempId }).unwrap(); //@remarks — If you need to access the error or success payload immediately after a mutation, you can chain .unwrap().
        dispatch(loginSuccess(response.user));
        toast.success("OTP verified successfully!");
        onClose();
        router.push("/");
      } catch (error) {
        toast.error('Invalid OTP. Please try again.')
      }
    },
  });

  if(!isOpen) return null;
  return (<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
      <p className="text-sm text-gray-600 mb-4">Check your email for the OTP.</p>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <Input
            id="otp"
            type="text"
            placeholder="6-digit OTP"
            {...formik.getFieldProps('otp')}
            className={`h-12 rounded-lg border px-4 ${
              formik.touched.otp && formik.errors.otp ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.otp && formik.errors.otp && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.otp}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            className="h-12 w-full rounded-lg bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
          >
            Verify
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-lg bg-gray-300 text-black hover:bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  </div>);
}

export default OTPModal;
