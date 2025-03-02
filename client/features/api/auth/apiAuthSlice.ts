import { AuthResponse, OTPFormValues, SignupFormValues } from '@/types/auth';
import {BaseQueryApi, BaseQueryFn, createApi, EndpointBuilder, EndpointDefinitions, fetchBaseQuery, QueryReturnValue} from '@reduxjs/toolkit/query/react'

const apiUrl =process.env.NEXT_PUBLIC_API_URL
export const apiAuthSlice = createApi({
    reducerPath: 'apiAuth',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        credentials:'include'//send cookies with requests
    }),
    endpoints:(builder) => ({
        signup: builder.mutation<{message: string; tempId: string}, SignupFormValues>({
            query:(credentials) => ({
                url: '/auth/send-email',
                method: 'POST',
                body: credentials
            })
        }),
        verifyOTP: builder.mutation<AuthResponse, OTPFormValues & {tempId: string}>({
            query:({otp,tempId})=>({
                url:'/auth/verify-otp',
                method: 'POST',
                body: {otp, tempId},
                credentials: 'include'
            })
        })
    })
})

export const {useSignupMutation, useVerifyOTPMutation} =apiAuthSlice;