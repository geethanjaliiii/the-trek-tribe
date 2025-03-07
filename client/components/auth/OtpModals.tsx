"use client";
import { useVerifyOTPMutation } from "@/features/api/auth/apiAuthSlice";
import { otpSchema } from "@/schemas/auth/otpSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { Fragment, useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerified?: () => void;
  onResendOtp: () => void;
}

function OTPModal({ isOpen, onClose, email, onVerified, onResendOtp }: OTPModalProps) {
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer

  // Timer logic
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formik = useFormik({
    initialValues: { otp: "" }, // otp is a string
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        const response = await verifyOTP({ otp: values.otp, email }).unwrap();
        console.log(response);
        toast.success("OTP verified successfully!");
        onClose();
        if (onVerified) onVerified();
        setOtp(["", "", "", "", "", ""]); // Reset OTP fields
        formik.resetForm();
      } catch (error) {
        toast.error("Invalid OTP. Please try again.");
      }
    },
  });

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    const newOtp = [...otp.map((data, idx) => (idx === index ? element.value : data))];
    setOtp(newOtp);
    const otpString = newOtp.join("");
    formik.setFieldValue("otp", otpString); // Sync Formik's otp with the array
    formik.setFieldTouched("otp", true); // Mark otp as touched for validation

    // Move focus to next input
    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleResendOtp = async () => {
    setOtp(["", "", "", "", "", ""]);
    formik.setFieldValue("otp", ""); // Reset Formik's otp
    formik.setFieldTouched("otp", false); // Reset touched state
    setTimeLeft(60); // Reset timer
    try {
      await onResendOtp();
      toast.success("OTP resent successfully!");
    } catch (error) {
      console.log(error, "error sending otp");
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                  Verify OTP
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Enter the 6-digit OTP sent to <span className="font-medium">{email}</span>.
                  </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="mt-4">
                  <div className="flex justify-center space-x-2">
                    {otp.map((data, index) => (
                      <Input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                        onBlur={() => formik.setFieldTouched("otp", true)} // Trigger validation on blur
                        className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg border-gray-300 focus:border-[#2D6A4F] focus:outline-none transition"
                      />
                    ))}
                  </div>

                  {formik.touched.otp && formik.errors.otp && (
                    <p className="mt-2 text-sm text-red-500 text-center">{formik.errors.otp}</p>
                  )}

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      Time Remaining:{" "}
                      <span className="font-medium">
                        {Math.floor(timeLeft % 60)
                          .toString()
                          .padStart(2, "0")}
                        s
                      </span>
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || otp.join("").length !== 6}
                    className="w-full mt-4 h-12 rounded-lg bg-[#2D6A4F] text-white hover:bg-[#1B4332] disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={timeLeft > 0}
                    className={`w-full mt-2 h-12 rounded-lg text-white ${
                      timeLeft > 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
                  </Button>

                  <Button
                    type="button"
                    onClick={onClose}
                    className="w-full mt-2 h-12 rounded-lg bg-gray-300 text-black hover:bg-gray-400"
                  >
                    Cancel
                  </Button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default OTPModal;