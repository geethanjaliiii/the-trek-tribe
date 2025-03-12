"use client";

import {
  GoogleLogin,
  CredentialResponse,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useGoogleLoginMutation } from "@/features/api/auth/apiAuthSlice";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/features/auth/authSlice";

interface GoogleLoginButtonProps {
  role: "client" | "vendor";
}

export default function GoogleLoginButton({ role }: GoogleLoginButtonProps) {
  const [googleLogin, { isLoading }] = useGoogleLoginMutation();
  const router = useRouter();
  const dispatch =useDispatch()
  const clientId: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const result = await googleLogin({
        credential: credentialResponse.credential, // ID token
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        role,
      }).unwrap();

      console.log("Google login result:", result);
      dispatch(setUserDetails(result?.data?.user));
      router.push(role === "client" ? "/" : "/vendor/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        type="standard"
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        logo_alignment="center"
        locale="en"
      />
    </GoogleOAuthProvider>
  );
}

// import { useGoogleLoginMutation } from "@/features/api/auth/apiAuthSlice";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";
// import { setUserDetails } from "@/features/auth/authSlice";
// import { error } from "console";
// interface GoogleLoginButtonProps {
//   role: "client" | "vendor";
// }
// function GoogleLoginButton({ role }: GoogleLoginButtonProps) {
//   const [googleLogin, { isLoading }] = useGoogleLoginMutation();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const response = await googleLogin({
//           credential: tokenResponse.access_token,
//           client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
//           role,
//         }).unwrap();
//         console.log('google login response',response);

//         dispatch(setUserDetails(response?.data?.user));
//         // Redirect based on role
//         const redirectPath = role === "client" ? "/" : "/vendor/dashboard";

//         router.push(redirectPath);
//       } catch (error) {
//         console.error("Google login failed error:", error);
//       }
//     },
//     onError: (error) => {
//       console.error("Hoogle login failed", error);
//     },
//   });
//   return (
//     <button
//       onClick={() => login()}
//       disabled={isLoading}
//       className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
//     >
//       <svg className="w-5 h-5" viewBox="0 0 24 24">
//         {/* Google SVG paths remain the same */}
//       </svg>
//       {isLoading ? "Loading..." : `Sign in with Google `}
//     </button>
//   );
// }

// export default GoogleLoginButton;
