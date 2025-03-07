"use client";
import { ClientSignupValues, SignupFormValues } from "@/types/auth";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Eye, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOTPMutation,
} from "@/features/api/auth/apiAuthSlice";
import { UserRoles } from "@/shared/constants";
import { useRouter } from "next/navigation";
import OTPModal from "@/components/auth/OTPModal";
import { userValidation } from "../../../schemas/userValidation";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/features/auth/authSlice";

const travelQuotes: string[] = [
  "Explore the Unknown",
  "Find Your Next Adventure",
  "Wander More, Worry Less",
  "Adventure Awaits",
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [index, setIndex] = useState(0);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState<ClientSignupValues | null>(null);

  const dispatch = useDispatch()
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % travelQuotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userValidation,
    onSubmit: async (values) => {
      const clientData: ClientSignupValues = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: UserRoles.CLIENT,
      };
      try {
        await sendOtp(clientData).unwrap();
        setEmail(values.email);
        setUserData(clientData);
        setIsOtpModalOpen(true);
        toast.success("OTP sent to your email!");
      } catch (error) {
        toast.error("Failed to send OTP. Please try again.");
      }
    },
  });
  const handleVerifyOtp = async (otp: string) => {
    try {
     const response = await verifyOTP({otp,email}).unwrap();
      console.log(response,'otp verified');
        await handleRegister();
        setIsOtpModalOpen(false)
      
     
    } catch (error) {
      toast.error("Invalid otp!")
      console.error("otp verification failed",error)
    }
  };

  const handleResendOtp = async () => {
    if (!userData) return;
    try {
      await sendOtp(userData).unwrap();
      toast.success("OTP resent successfully!");
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
      throw error
    }
  };

  const handleRegister = async () => {
    if (!userData) return;
    try {
    const response=  await register(userData).unwrap();
      dispatch(setUserDetails(response?.data?.user))
      router.push("/");
      
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.squarespace-cdn.com/content/v1/673cee86ad088e3ecfefc656/c9f1e953-91d5-484e-9487-e5b061ce2548/justin-kauffman-a8lTjWJJgLA-unsplash.jpg?format=1000w')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="grid lg:grid-cols-[2fr_3fr]">
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-xl text-center font-semibold text-[#337b5d]">
                The Trek Tribe
              </h1>
            </div>
            <h2 className="mb-8 text-3xl text-center font-bold text-gray-900">
              Start your perfect trip
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <Input
                  id="fullName"
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
                  placeholder="Password"
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
                  type={showConfirmPassword ? "text" : "password"}
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
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showConfirmPassword ? (
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
                disabled={isSendingOtp || isRegistering}
                className="h-12 w-full rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
              >
                {isSendingOtp ? "Sending OTP..." : "Start"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#2D6A4F] hover:text-[#1B4332]"
              >
                Log in
              </Link>
            </p>
          </div>

          <div className="relative hidden lg:block">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/673cee86ad088e3ecfefc656/c9f1e953-91d5-484e-9487-e5b061ce2548/justin-kauffman-a8lTjWJJgLA-unsplash.jpg?format=1000w"
              alt="mountain view"
              className="h-full w-full object-cover rounded-3xl p-2"
              width={1000}
              height={1000}
              priority
            />
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

      <OTPModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        email={email}
        onVerified={handleRegister}
        onSubmit={handleVerifyOtp}
        onResendOtp={handleResendOtp}
      />
    </div>
  );
}

//******************************************************* */
// "use client";
// import {
//   ClientSignupValues,
//   SignupFormValues,
//   SocialAuthProvider,
// } from "@/types/auth";
// import { useFormik } from "formik";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Eye, EyeIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   useRegisterMutation,
//   useSendOtpMutation,
//   useVerifyOTPMutation,
// } from "@/features/api/auth/apiAuthSlice";
// import { UserRoles } from "@/shared/constants";
// import { useRouter } from "next/navigation";
// import OTPModal from "@/components/auth/OtpModals";
// import { userValidation } from "../../../schemas/userValidation";

// const socialProviders: SocialAuthProvider[] = [
//   { name: "google", icon: "google" },
// ];

// const travelQuotes: string[] = [
//   "Explore the Unknown",
//   "Find Your Next Adventure",
//   "Wander More, Worry Less",
//   "Adventure Awaits",
// ];

// export default function SignupPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setConfirmPassword] = useState(false)
//   const [index, setIndex] = useState(0);
//   const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [userData, setUserData] = useState<ClientSignupValues | null>(null);
//    const[otpMessage,setOtpMessage]=useState('')
//    const[otpErrMessage,setOtpErrMessage]=useState('')

//   // RTK Query

//   const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
//   const [register, { isLoading: isRegistering }] = useRegisterMutation();
//   const router = useRouter();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % travelQuotes.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const formik = useFormik<SignupFormValues>({
//     initialValues: {
//       fullName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: userValidation,
//     onSubmit: async (values) => {
//       const clientData: ClientSignupValues = {
//         fullName: values.fullName,
//         email: values.email,
//         password: values.password,
//         role: UserRoles.CLIENT,
//       };
//       try {
//         // Send OTP request
//         const response = await sendOtp(clientData).unwrap();
//         setEmail(values.email); // Store email for OTP modal
//         setUserData(clientData); // Store full data for registration
//         setIsOtpModalOpen(true);
//         console.log("OTP sent:", values, response);
//         toast.success("OTP sent to your email!");
//       } catch (error) {
//         console.error("Error sending OTP:", error);
//         toast.error("Failed to send OTP. Please try again.");
//       }
//     },
//   });

//   const handleResendOtp = async ()=>{
//     try {
//       const response = await sendOtp(userData as ClientSignupValues).unwrap();
//       toast.success("OTP sent successfully. Please check your email.")
//     } catch (error) {
//       toast.error("Failed to send OTP. Please try again.");
//     }
//   }
//   const handleRegister = async () => {
//     if (userData) {
//       try {
//         await register(userData).unwrap();
//         router.push("/");
//         toast.success("Account created successfully!");
//       } catch (error) {
//         console.error("Error registering:", error);
//         toast.error("Registration failed. Please try again.");
//       }
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleConfirmPasswordVisibility = () => setConfirmPassword(!showConfirmPassword);

//   return (
//     <div
//       className="relative flex h-screen w-full items-center justify-center bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://images.squarespace-cdn.com/content/v1/673cee86ad088e3ecfefc656/c9f1e953-91d5-484e-9487-e5b061ce2548/justin-kauffman-a8lTjWJJgLA-unsplash.jpg?format=1000w')",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/40"></div>

//       <div className="relative z-10 mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
//         <div className="grid lg:grid-cols-[2fr_3fr]">
//           <div className="p-8 md:p-12">
//             <div className="mb-8">
//               <h1 className="text-xl text-center font-semibold text-[#337b5d]">
//                 The Trek Tribe
//               </h1>
//             </div>
//             <h2 className="mb-8 text-3xl text-center font-bold text-gray-900">
//               Start your perfect trip
//             </h2>

//             <form onSubmit={formik.handleSubmit} className="space-y-4">
//               <div>
//                 <Input
//                   id="fullName"
//                   type="text"
//                   placeholder="Full name"
//                   {...formik.getFieldProps("fullName")}
//                   className={`h-12 rounded-3xl bg-gray-50 px-4 ${
//                     formik.touched.fullName && formik.errors.fullName
//                       ? "border-red-500"
//                       : ""
//                   }`}
//                 />
//                 {formik.touched.fullName && formik.errors.fullName && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {formik.errors.fullName}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Email"
//                   {...formik.getFieldProps("email")}
//                   className={`h-12 rounded-3xl bg-gray-50 px-4 ${
//                     formik.touched.email && formik.errors.email
//                       ? "border-red-500"
//                       : ""
//                   }`}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
//                 )}
//               </div>

//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   {...formik.getFieldProps("password")}
//                   className={`h-12 rounded-3xl bg-gray-50 px-4 ${
//                     formik.touched.password && formik.errors.password
//                       ? "border-red-500"
//                       : ""
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-3 text-gray-400"
//                 >
//                   {showPassword ? (
//                     <EyeIcon className="h-6 w-6" />
//                   ) : (
//                     <Eye className="h-6 w-6" />
//                   )}
//                 </button>
//                 {formik.touched.password && formik.errors.password && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {formik.errors.password}
//                   </p>
//                 )}
//               </div>

//               <div className="relative">
//                 <Input
//                   id="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Confirm password"
//                   {...formik.getFieldProps("confirmPassword")}
//                   className={`h-12 rounded-3xl bg-gray-50 px-4 ${
//                     formik.touched.confirmPassword && formik.errors.confirmPassword
//                       ? "border-red-500"
//                       : ""
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={toggleConfirmPasswordVisibility}
//                   className="absolute right-3 top-3 text-gray-400"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeIcon className="h-6 w-6" />
//                   ) : (
//                     <Eye className="h-6 w-6" />
//                   )}
//                 </button>
//                 {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {formik.errors.confirmPassword}
//                   </p>
//                 )}
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isSendingOtp || isRegistering}
//                 className="h-12 w-full rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
//               >
//                 {isSendingOtp ? "Sending OTP..." : "Start"}
//               </Button>
//             </form>

//             <p className="mt-6 text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 href="/login"
//                 className="font-semibold text-[#2D6A4F] hover:text-[#1B4332]"
//               >
//                 Log in
//               </Link>
//             </p>
//           </div>

//           {/* Image Section */}
//           <div className="relative hidden lg:block">
//             <Image
//               src="https://images.squarespace-cdn.com/content/v1/673cee86ad088e3ecfefc656/c9f1e953-91d5-484e-9487-e5b061ce2548/justin-kauffman-a8lTjWJJgLA-unsplash.jpg?format=1000w"
//               alt="mountain view"
//               className="h-full w-full object-cover rounded-3xl p-2"
//               width={1000}
//               height={1000}
//               priority
//             />
//             <div className="absolute bottom-64 left-8 p-10">
//               <AnimatePresence mode="wait">
//                 <motion.p
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.8 }}
//                   className="text-6xl font-extrabold text-white px-4 py-2 leading-relaxed"
//                 >
//                   {travelQuotes[index]}
//                 </motion.p>
//               </AnimatePresence>
//             </div>
//             <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm">
//               <div className="h-2 w-2 rounded-full bg-[#2D6A4F]" />
//               <span className="text-sm font-medium">Gorsia Village</span>
//               <span className="text-sm text-gray-600">Villa Mexico</span>
//             </div>
//             <div className="absolute bottom-12 right-6 rounded-lg bg-white/80 px-4 py-2 backdrop-blur-sm">
//               <p className="text-sm font-medium">1.2 km</p>
//               <p className="text-xs text-gray-600">left to your recommendation</p>
//             </div>
//             <div className="absolute bottom-6 left-6 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm">
//               <span className="text-sm font-medium">Gringo Trail</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <OTPModal
//         isOpen={isOtpModalOpen}
//         onClose={() => setIsOtpModalOpen(false)}
//         email={email}
//         onVerified={handleRegister}
//         onResendOtp={handleResendOtp}
//         otpMessage={otpMessage}
//         otpErrmessage={otpErrMessage}
//       />
//     </div>
//   );
// }
