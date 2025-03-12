import {
  AuthResponse,
  ClientSignupValues,
  LoginFormValues,
  OTPFormValues,
  OTPVerifyResponse,
  RegisterMutaionValues,
} from "@/types/auth";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  EndpointBuilder,
  EndpointDefinitions,
  fetchBaseQuery,
  QueryReturnValue,
} from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const apiAuthSlice = createApi({
  reducerPath: "apiAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    credentials: "include", //send cookies with requests
  }),
  endpoints: (builder) => ({
    //{message...}-return type,{email: string}-arg type
    sendOtp: builder.mutation<
      { message: string; tempId: string },
      RegisterMutaionValues
    >({
      query: (credentials) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOTP: builder.mutation<
      OTPVerifyResponse,
      OTPFormValues & { email: string }
    >({
      query: ({ otp, email }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { otp, email },
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterMutaionValues>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginFormValues>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    googleLogin: builder.mutation<AuthResponse,{credential:any,client_id:string,role:string}>({
      query: (body) => ({
        url: "/auth/google-auth",
        method: "POST",
        body,
      }),
    }),
    logout:builder.mutation({
        query:(body)=>({
            url:'/logout',
            method:'POST',
            body
        }),
    })
  }),
});

export const {
  useRegisterMutation,
  useVerifyOTPMutation,
  useSendOtpMutation,
  useLoginMutation,
  useGoogleLoginMutation
} = apiAuthSlice;
