'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import { useFormik } from "formik";
import { Eye, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {vendorSchema} from '../../../schemas/vendor/vendorSchema'

export default function VendorRegistrationPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1); // Multi-step form (1: Basic Info, 2: Confirmation)
  
    const formik = useFormik({
      initialValues: {
        businessName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: vendorSchema,
      onSubmit: async (values) => {
        if (step === 1) {
          setStep(2); // Move to confirmation step
        } else {
          try {
            const response = await axiosInstance.post("/api/vendor/register", {
              businessName: values.businessName,
              email: values.email,
              phoneNumber: values.phoneNumber,
              password: values.password,
              role: "vendor",
            });
            toast.success(
              "Registration submitted! Please wait for admin approval."
            );
            window.location.href = "/vendor/dashboard"; // Redirect to dashboard
          } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
          }
        }
      },
    });
  
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
    return (
      <div className="min-h-screen flex bg-gray-50">
        {/* Left Section: Branding & Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-teal-500 text-white flex-col justify-between p-10">
          <div>
            <h1 className="text-3xl font-bold">The Trek Tribe</h1>
            <p className="mt-2 text-lg">Partner with us to grow your travel business</p>
          </div>
          <div className="mt-10">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/673cee86ad088e3ecfefc656/c9f1e953-91d5-484e-9487-e5b061ce2548/justin-kauffman-a8lTjWJJgLA-unsplash.jpg?format=1000w"
              alt="Travel Illustration"
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
          <p className="text-sm mt-4">
            Join thousands of vendors offering amazing travel experiences.
          </p>
        </div>
  
        {/* Right Section: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
            {/* Progress Indicator */}
            <div className="flex justify-between mb-6">
              <div className={`flex-1 text-center ${step === 1 ? "text-green-600" : "text-gray-400"}`}>
                <span className={`inline-block w-8 h-8 rounded-full ${step === 1 ? "bg-green-600 text-white" : "bg-gray-200"}`}>1</span>
                <p className="text-sm mt-2">Basic Info</p>
              </div>
              <div className="flex-1 border-t-2 border-dashed mt-4 mx-2" />
              <div className={`flex-1 text-center ${step === 2 ? "text-green-600" : "text-gray-400"}`}>
                <span className={`inline-block w-8 h-8 rounded-full ${step === 2 ? "bg-green-600 text-white" : "bg-gray-200"}`}>2</span>
                <p className="text-sm mt-2">Confirmation</p>
              </div>
            </div>
  
            {/* Form Header */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {step === 1 ? "Become a Vendor Partner" : "Confirm Your Details"}
            </h2>
  
            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {step === 1 ? (
                <>
                  {/* Business Name */}
                  <div>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Business Name"
                      {...formik.getFieldProps("businessName")}
                      className={`w-full h-12 rounded-lg border ${
                        formik.touched.businessName && formik.errors.businessName
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500`}
                    />
                    {formik.touched.businessName && formik.errors.businessName && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.businessName}</p>
                    )}
                  </div>
  
                  {/* Email */}
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Business Email"
                      {...formik.getFieldProps("email")}
                      className={`w-full h-12 rounded-lg border ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                    )}
                  </div>
  
                  {/* Phone Number */}
                  <div>
                    <Input
                      id="phoneNumber"
                      type="text"
                      placeholder="Phone Number (10 digits)"
                      {...formik.getFieldProps("phoneNumber")}
                      className={`w-full h-12 rounded-lg border ${
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500`}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.phoneNumber}</p>
                    )}
                  </div>
  
                  {/* Password */}
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...formik.getFieldProps("password")}
                      className={`w-full h-12 rounded-lg border ${
                        formik.touched.password && formik.errors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeIcon className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {formik.touched.password && formik.errors.password && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                    )}
                  </div>
  
                  {/* Confirm Password */}
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...formik.getFieldProps("confirmPassword")}
                      className={`w-full h-12 rounded-lg border ${
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeIcon className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.confirmPassword}</p>
                    )}
                  </div>
  
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    Next
                  </Button>
                </>
              ) : (
                <>
                  {/* Confirmation Step */}
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Please review your details before submitting:
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p><strong>Business Name:</strong> {formik.values.businessName}</p>
                      <p><strong>Email:</strong> {formik.values.email}</p>
                      <p><strong>Phone Number:</strong> {formik.values.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="w-1/2 h-12 rounded-lg"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="w-1/2 h-12 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}
            </form>
  
            {/* Login Link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Already a vendor?{" "}
              <Link href="/vendor/login" className="text-green-600 font-semibold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }