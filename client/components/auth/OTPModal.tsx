"use client"
import { useVerifyOTPMutation } from "@/features/api/auth/apiAuthSlice";
import { otpSchema } from "@/schemas/auth/otpSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { log } from "util";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string ;
  onVerified?: ()=>void;
}

function OTPModal({ isOpen, onClose, email ,onVerified}: OTPModalProps) {
 
  const [verifyOTP,{isLoading}]=useVerifyOTPMutation()
  const router = useRouter();

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        const response= await verifyOTP({ otp: values.otp, email }).unwrap(); //@remarks — If you need to access the error or success payload immediately after a mutation, you can chain .unwrap().
       console.log(response,'verify otp');
       
        toast.success("OTP verified successfully!");
        onClose();
        if(onVerified) onVerified()
      } catch (error) {
    console.log('error verify',error);
    
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
            disabled={isLoading}
            className="h-12 w-full rounded-lg bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
          >
          {isLoading? 'Verifying..' :'Verify' }
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
