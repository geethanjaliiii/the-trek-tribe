"use client"
import { useVerifyOTPMutation } from "@/features/api/auth/apiAuthSlice";
import { otpSchema } from "@/schemas/auth/otpSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { log } from "util";
import { Dialog, Transition } from "@headlessui/react";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string ;
  onVerified?: ()=>void;
  onResendOtp:()=>void;
  onSubmit:(otp: string)=>void
}

function OTPModal({ isOpen, onClose, email ,onVerified,onResendOtp,onSubmit}: OTPModalProps) {

  const router = useRouter();
const [timeLeft, setTimeLeft]=useState(60);
const[otp,setOtp] = useState<string[]>(["", "", "", "", "", ""])



useEffect(()=>{
  if(!isOpen) return;

  const timer =setInterval(()=>{
    setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1:0));
  },1000);
  return ()=> clearInterval(timer)
},[isOpen]);


function handleChange(element:HTMLInputElement , index:number){
  if(isNaN(Number(element.value))) return false;
  const newOtp =[...otp.map((data,idx)=>(idx===index? element.value: data))];
  setOtp(newOtp)
  console.log('otp',otp);

  if (element.nextSibling) {
    (element.nextSibling as HTMLInputElement).focus();
  }
}

async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  try {
    const otpString = otp.join("");
    await onSubmit(otpString);
    setOtp(["", "", "", "", "", ""])
  } catch (error) {
    console.log('error sending otp',error);
  }
}

async function handleResendOtp(){
  setOtp(["", "", "", "", "", ""]);
  setTimeLeft(60);
  try {
    await onResendOtp();
  } catch (error) {
    console.log("Error resending OTP:", error);
  }
}
  if(!isOpen) return null;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Enter OTP
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Please enter the 6-digit OTP sent to your phone.
                  </p>
                </div>
                {/* {otpMessage && (
                  <p className="mt-2 text-center text-sm text-green-600">
                    {otpMessage}
                  </p>
                )} */}

                {/* {otpErrMessage && (
                  <p className="mt-2 text-center text-sm text-green-600">
                    {otpErrMessage}
                  </p>
                )} */}
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex justify-center space-x-2">
                    {otp.map((data, index) => {
                      return (
                        <input
                          className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
                          type="text"
                          name="otp"
                          maxLength={1}
                          key={index}
                          value={data}
                          onChange={(e) => handleChange(e.target, index)}
                          
                        />
                      );
                    })}
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      Time Remaining:{" "}
                      <span className="font-medium">
                        {Math.floor(timeLeft % 60)
                          .toString()
                          .padStart(2, "0")}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    >
                      Verify OTP
                    </button>
                  </div>
                </form>

                <div className="mt-4">
                  <button
                    onClick={handleResendOtp}
                    disabled={timeLeft > 0}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${
                      timeLeft > 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                  >
                    {timeLeft > 0 ? `Resend OTP n ${timeLeft}s ` : "Resend OTP"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
  // return (<div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
  //   <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
  //     <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
  //     <p className="text-sm text-gray-600 mb-4">Check your email for the OTP.</p>
  //     <form onSubmit={formik.handleSubmit} className="space-y-4">
  //       <div>
  //         <Input
  //           id="otp"
  //           type="text"
  //           placeholder="6-digit OTP"
  //           {...formik.getFieldProps('otp')}
  //           className={`h-12 rounded-lg border px-4 ${
  //             formik.touched.otp && formik.errors.otp ? 'border-red-500' : ''
  //           }`}
  //         />
  //         {formik.touched.otp && formik.errors.otp && (
  //           <p className="mt-1 text-sm text-red-500">{formik.errors.otp}</p>
  //         )}
  //       </div>
  //       <div className="flex gap-2">
  //         <Button
  //           type="submit"
  //           disabled={isLoading}
  //           className="h-12 w-full rounded-lg bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
  //         >
  //         {isLoading? 'Verifying..' :'Verify' }
  //         </Button>
  //         <Button
  //           type="button"
  //           onClick={onClose}
  //           className="h-12 w-full rounded-lg bg-gray-300 text-black hover:bg-gray-400"
  //         >
  //           Cancel
  //         </Button>
  //       </div>
  //     </form>
  //   </div>
  // </div>);
}

export default OTPModal;
