"use client";
import { SignupFormValues, SocialAuthProvider } from "@/types/auth";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { userValidation } from "../../../schemas/userValidation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Eye, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const socialProviders: SocialAuthProvider[] = [
  { name: "google", icon: "google" },
];

const travelQuotes:string[] = [
  "Explore the Unknown",
  "Find Your Next Adventure",
  "Wander More, Worry Less",
  "Adventure Awaits",
];
export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [index,setIndex]=useState(0);

  useEffect(()=>{
    const interval=setInterval(()=>{
      setIndex((prevIndex)=>(prevIndex+1)%travelQuotes.length);
    },3000)

    return ()=>clearInterval(interval)
  })
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userValidation,
    onSubmit: async (values) => {
      try {
        console.log("Form sub,itted", values);
        toast.success("Account created successfully!");
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
<div className="relative flex h-screen w-full items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: "url('https://images.squarespace-cdn.com/content/v1/673cee86ad088e3ecfefc656/c9f1e953-91d5-484e-9487-e5b061ce2548/justin-kauffman-a8lTjWJJgLA-unsplash.jpg?format=1000w')" }}>
     
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className=" relative z-10 mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="grid lg:grid-cols-[2fr_3fr]">
          {/*login form container */}
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-xl text-center font-semibold text-[#337b5d]">
                The Trek Tribe
              </h1>
            </div>

            <h2 className="mb-8 text-3xl text-center font-bold  text-gray-900">
              Start your perfect trip
            </h2>

            {/* Social Login */}
            <div className="mb-6 space-y-4">
              <div className="flex justify-center gap-4">
                {/* {socialProviders.map((provider) => (
                  <button
                    key={provider.name}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with {provider.name}</span>
                    <Image src={`/${provider.name}-logo.svg`} alt={`${provider.name} logo`} width={24} height={24} />
                  </button>
                ))} */}
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">or</span>
                </div>
              </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <Input
                  id="fullName"
                  // name='fullName'
                  type="text"
                  placeholder="Full name"
                  {...formik.getFieldProps("fullName")}
                  className={`h-12 rounded-3xl bg-gray-50 px-4 ${
                    formik.touched.fullName && formik.errors.fullName
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <Input
                  id="email"
                  // name="email"
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                  className={`h-12 rounded-3xl bg-gray-50 px-4 ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  {...formik.getFieldProps("password")}
                  className={`h-12 rounded-3xl bg-gray-50 px-4 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? (
                    <EyeIcon className="h-6 w-6" />
                  ) : (
                    <Eye className="h-6 w-6" />
                  )}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...formik.getFieldProps("confirmPassword")}
                  className={`h-12 rounded-3xl bg-gray-50 px-4 ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? (
                    <EyeIcon className="h-6 w-6" />
                  ) : (
                    <Eye className="h-6 w-6" />
                  )}
                </button>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
              >
                Start
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#2D6A4F] hover:text-[#1B4332]"
              >
                Login in
              </Link>
            </p>
          </div>

          {/* image section */}
          <div className="relative hidden lg:block">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/673cee86ad088e3ecfefc656/c9f1e953-91d5-484e-9487-e5b061ce2548/justin-kauffman-a8lTjWJJgLA-unsplash.jpg?format=1000w"
              alt="mountain view"
              className="h-full w-full object-cover rounded-3xl p-2"
              width={1000}
              height={1000}
              priority
            />
            {/* Changing Quote Text */}
      <div className="absolute bottom-64 left-8 p-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-extrabold text-white px-4 py-2 leading-relaxed"
          >
            {travelQuotes[index]}
          </motion.p>
        </AnimatePresence>
      </div>
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-[#2D6A4F]" />
              <span className="text-sm font-medium">Gorsia Village</span>
              <span className="text-sm text-gray-600">Villa Mexico</span>
            </div>
            <div className="absolute bottom-12 right-6 rounded-lg bg-white/80 px-4 py-2 backdrop-blur-sm">
              <p className="text-sm font-medium">1.2 km</p>
              <p className="text-xs text-gray-600">
                left to your recommendation
              </p>
            </div>
            <div className="absolute bottom-6 left-6 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium">Gringo Trail</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
