
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface propType {
    changeForm:()=>void;
    isOpen:boolean
}

const VendorSignupForm = ({changeForm, isOpen}:propType) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for signup
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="relative w-full max-w-md bg-white rounded-xl p-8 shadow-lg border border-earth-light animate-fade-in">
        {/* Close button */}
        <button
          onClick={changeForm}
          className="absolute top-4 right-4 text-charcoal-light hover:text-charcoal-dark z-50"
          type="button"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="mb-6 flex items-center gap-2">
          {/* Placeholder for logo (you can replace with actual logo) */}
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full" />
          <h2 className="text-2xl font-medium text-charcoal-dark">Create an account</h2>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2 relative">
            <label
              htmlFor="name"
              className="text-sm font-medium text-charcoal-light block"
            >
              Your name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="First and last name"
              className="w-full border-earth-light focus:border-olive focus:ring-olive relative z-10"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2 relative">
            <label
              htmlFor="email"
              className="text-sm font-medium text-charcoal-light block"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="w-full border-earth-light focus:border-olive focus:ring-olive relative z-10"
              required
            />
            <p className="text-xs text-earth-dark">
              We will send a confirmation link to your email
            </p>
          </div>

          {/* Password Field */}
          <div className="space-y-2 relative">
            <label
              htmlFor="password"
              className="text-sm font-medium text-charcoal-light block"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter at least 8 characters"
                className="w-full pr-10 border-earth-light focus:border-olive focus:ring-olive relative z-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-dark hover:text-olive z-20"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-earth-dark">
              Use letters, numbers, & special characters (!@#$%^&*)
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2 relative">
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-charcoal-light block"
            >
              Confirm password
            </label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className="w-full pr-10 border-earth-light focus:border-olive focus:ring-olive relative z-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-dark hover:text-olive z-20"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 relative z-10"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        {/* Terms and Privacy Policy */}
        <div className="mt-4 text-center">
          <p className="text-xs text-earth-dark">
            By proceeding, you agree to Adventure Connect's{" "}
            <Link
              href="#"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Terms & Conditions
            </Link>
          </p>
        </div>

        {/* Link to Sign In */}
        <div className="mt-4 text-center">
          <p className="text-earth-dark">
            Already have an account?{" "}
            <button
              onClick={changeForm}
              className="text-orange-500 hover:text-orange-600 font-medium bg-transparent border-none cursor-pointer"
              type="button"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorSignupForm;

// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";

// interface propType {
//     changeForm:()=>void;
//     isOpen:boolean
// }
// const VendorSignupForm = ({changeForm, isOpen}:propType) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // Simulate API call for signup
//     setTimeout(() => {
//       setIsLoading(false);
//       setIsModalOpen(false); // Close modal on successful signup
//     }, 1500);
//   };

//   return (
//     <div>
//       {/* Button to open the signup modal
//       <Button
//         onClick={() => setIsModalOpen(true)}
//         className="bg-olive hover:bg-olive-dark text-white transition-all duration-300"
//       >
//         Sign up
//       </Button> */}

//       {/* Modal for signup form */}
//       {(
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-100">
//           <div className="relative w-full max-w-md bg-white rounded-xl p-8 shadow-lg border border-earth-light animate-fade-in">
//             {/* Close button */}
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-4 right-4 text-charcoal-light hover:text-charcoal-dark"
//             >
//               ✕
//             </button>

//             {/* Modal Header */}
//             <div className="mb-6 flex items-center gap-2">
//               {/* Placeholder for logo (you can replace with actual logo) */}
//               <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full" />
//               <h2 className="text-2xl font-medium text-charcoal-dark">Create an account</h2>
//             </div>

//             {/* Signup Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Name Field */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="name"
//                   className="text-sm font-medium text-charcoal-light block"
//                 >
//                   Your name
//                 </label>
//                 <Input
//                   id="name"
//                   type="text"
//                   placeholder="First and last name"
//                   className="w-full border-earth-light focus:border-olive focus:ring-olive"
//                   required
//                 />
//               </div>

//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="email"
//                   className="text-sm font-medium text-charcoal-light block"
//                 >
//                   Email address
//                 </label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email address"
//                   className="w-full border-earth-light focus:border-olive focus:ring-olive"
//                   required
//                 />
//                 <p className="text-xs text-earth-dark">
//                   We will send a confirmation link to your email
//                 </p>
//               </div>

//               {/* Password Field */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="password"
//                   className="text-sm font-medium text-charcoal-light block"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter at least 8 characters"
//                     className="w-full pr-10 border-earth-light focus:border-olive focus:ring-olive"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-dark hover:text-olive"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 <p className="text-xs text-earth-dark">
//                   Use letters, numbers, & special characters (!@#$%^&*)
//                 </p>
//               </div>

//               {/* Confirm Password Field */}
//               <div className="space-y-2">
//                 <label
//                   htmlFor="confirm-password"
//                   className="text-sm font-medium text-charcoal-light block"
//                 >
//                   Confirm password
//                 </label>
//                 <div className="relative">
//                   <Input
//                     id="confirm-password"
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Re-enter your password"
//                     className="w-full pr-10 border-earth-light focus:border-olive focus:ring-olive"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-dark hover:text-olive"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Creating account..." : "Create account"}
//               </Button>
//             </form>

//             {/* Terms and Privacy Policy */}
//             <div className="mt-4 text-center">
//               <p className="text-xs text-earth-dark">
//                 By proceeding, you agree to Go-MMT's{" "}
//                 <Link
//                   href="#"
//                   className="text-blue-500 hover:text-blue-600 font-medium"
//                 >
//                   Privacy Policy
//                 </Link>{" "}
//                 and{" "}
//                 <Link
//                   href="#"
//                   className="text-blue-500 hover:text-blue-600 font-medium"
//                 >
//                   Terms & Conditions
//                 </Link>
//               </p>
//             </div>

//             {/* Link to Sign In */}
//             <div className="mt-4 text-center">
//               <p className="text-earth-dark">
//                 Already have an account?{" "}
//                 <p
//                 onClick={changeForm}
//                   className="text-orange-500 hover:text-orange-600 font-medium"
//                 >
//                   Sign in
//                 </p>
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VendorSignupForm;