import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import VendorSignupForm from "./VendorSignupForm";

const VendorLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {showLogin ? (
        <div className="w-full max-w-md mx-auto bg-white rounded-xl p-8 shadow-lg border border-earth-light">
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-charcoal-dark">Sign in</h2>
            <p className="text-earth-dark mt-1">Access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-charcoal-light block"
              >
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="w-full border-earth-light focus:border-olive focus:ring-olive"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-charcoal-light"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-medium text-olive hover:text-olive-dark"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pr-10 border-earth-light focus:border-olive focus:ring-olive"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-dark hover:text-olive"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-olive hover:bg-olive-dark text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-earth-dark">
              Don't have an account?{" "}
              <button
                onClick={() => setShowLogin(false)}
                className="text-olive hover:text-olive-dark font-medium bg-transparent border-none cursor-pointer"
                type="button"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      ) : (
        <VendorSignupForm
          changeForm={() => setShowLogin(true)}
          isOpen={!showLogin}
        />
      )}
    </>
  );
};

export default VendorLoginForm;

// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import VendorSignupForm from "./VendorSignupForm";

// const VendorLoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <>
//       {showLogin ? (
//         <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-earth-light animate-fade-in relative z-50">
//           <div className="mb-6">
//             <h2 className="text-2xl font-medium text-charcoal-dark">Sign in</h2>
//             <p className="text-earth-dark mt-1">Access your dashboard</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2 relative">
//               <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-charcoal-light block"
//               >
//                 Email address
//               </label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="john@example.com"
//                 className="w-full border-earth-light focus:border-olive focus:ring-olive relative z-10"
//                 required
//               />
//             </div>

//             <div className="space-y-2 relative">
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="text-sm font-medium text-charcoal-light"
//                 >
//                   Password
//                 </label>
//                 <Link
//                   href="#"
//                   className="text-xs font-medium text-olive hover:text-olive-dark animated-underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className="w-full pr-10 border-earth-light focus:border-olive focus:ring-olive relative z-10"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-dark hover:text-olive z-20"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-olive hover:bg-olive-dark text-white transition-all duration-300 relative z-10"
//               disabled={isLoading}
//             >
//               {isLoading ? "Signing in..." : "Sign in"}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-earth-dark">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => setShowLogin(false)}
//                 className="text-olive hover:text-olive-dark font-medium animated-underline bg-transparent border-none cursor-pointer"
//                 type="button"
//               >
//                 Sign up
//               </button>
//             </p>
//           </div>
//         </div>
//       ) : (
//         <VendorSignupForm
//           changeForm={() => setShowLogin(true)}
//           isOpen={!showLogin}
//         />
//       )}
//     </>
//   );
// };

// export default VendorLoginForm;

// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import VendorSignupForm from "./VendorSignupForm";

// const VendorLoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <>
//       {showLogin ? (
//         <div className="w-full max-w-md mx-auto bg-white/80 z-100 backdrop-blur-md rounded-xl p-8 shadow-lg border border-earth-light animate-fade-in">
//           <div className="mb-6">
//             <h2 className="text-2xl font-medium text-charcoal-dark">Sign in</h2>
//             <p className="text-earth-dark mt-1">Access your dashboard</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-charcoal-light block"
//               >
//                 Email address
//               </label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="john@example.com"
//                 className="w-full border-earth-light focus:border-olive focus:ring-olive"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="text-sm font-medium text-charcoal-light"
//                 >
//                   Password
//                 </label>
//                 <Link
//                   href="#"
//                   className="text-xs font-medium text-olive hover:text-olive-dark animated-underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className="w-full pr-10 border-earth-light focus:border-olive focus:ring-olive"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-dark hover:text-olive"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-olive hover:bg-olive-dark text-white transition-all duration-300"
//               disabled={isLoading}
//             >
//               {isLoading ? "Signing in..." : "Sign in"}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-earth-dark">
//               Don't have an account?{" "}
//               <Button
//                 onClick={() => setShowLogin(false)}
//                 className="text-olive hover:text-olive-dark font-medium animated-underline"
//               >
//                 Sign up
//               </Button>
//             </p>
//           </div>
//         </div>
//       ) : (
//         <VendorSignupForm
//           changeForm={() => setShowLogin(true)}
//           isOpen={showLogin}
//         />
//       )}
//     </>
//   );
// };

// export default VendorLoginForm;
