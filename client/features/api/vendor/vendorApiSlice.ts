import { VendorVerificationValues } from "@/types/Vendor";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQuery";
const apiUrl =process.env.NEXT_PUBLIC_API_URL
export const vendorApiSlice = createApi({
    reducerPath:'vendorApi',
    baseQuery:createBaseQueryWithReauth('/_pvt/_ve/vendor'),
    endpoints:(builder) =>({
        sendVerificationRequest:builder.mutation<{success: boolean;message: string},VendorVerificationValues>({
            query:(credentials) => ({
                url:'/verify',
                method:'POST',
                body: credentials
            })
        }),
        getVendorDetails:builder.query<{success:boolean; message:string,vendor:Partial<VendorVerificationValues>},void>({
            query:()=>({
                url:'',
                method:'GET',
                
            })
        })
    })
})

export const {useSendVerificationRequestMutation,useGetVendorDetailsQuery} =vendorApiSlice;