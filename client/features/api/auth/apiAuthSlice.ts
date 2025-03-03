import { AuthResponse, ClientSignupValues, OTPFormValues, OTPVerifyResponse, SignupFormValues } from '@/types/auth';
import {BaseQueryApi, BaseQueryFn, createApi, EndpointBuilder, EndpointDefinitions, fetchBaseQuery, QueryReturnValue} from '@reduxjs/toolkit/query/react'

const apiUrl =process.env.NEXT_PUBLIC_API_URL
export const apiAuthSlice = createApi({
    reducerPath: 'apiAuth',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        credentials:'include'//send cookies with requests
    }),
    endpoints:(builder) => ({
        //{message...}-return type,{email: string}-arg type
        sendOtp: builder.mutation<{message: string; tempId: string}, ClientSignupValues>({
            query:(credentials) => ({
                url: '/auth/send-otp',
                method: 'POST',
                body: credentials
            })
        }),
        verifyOTP: builder.mutation<OTPVerifyResponse, OTPFormValues & {email: string}>({
            query:({otp,email})=>({
                url:'/auth/verify-otp',
                method: 'POST',
                body: {otp, email},
            })
        }),
        register: builder.mutation<AuthResponse,ClientSignupValues>({
            query:(body)=>({
                url:'/auth/register',
                method:'POST',
                body
            })
        })
    })
})

export const {useRegisterMutation, useVerifyOTPMutation, useSendOtpMutation} =apiAuthSlice;