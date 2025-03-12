import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQuery";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const adminApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery:createBaseQueryWithReauth('/_pvt/_ad/admin'),
  //  fetchBaseQuery({
  //   baseUrl: `${apiUrl}/_pvt/_ad/admin`,
  //   credentials: "include",
  // }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ userType = "client", page = 1, limit = 10, search = "" }) => ({
        url: "/users",
        params: { userType, page, limit, search },
      }),
    
    }),
    changeStatus:builder.mutation<{ success: boolean; message: string }, { userType: string; userId: any }>({
      query:(credentials) =>({
        url:'/users/status',
        method:'PATCH',
        body:credentials
      })
     })
  }),
});
export const { useGetAllUsersQuery ,useChangeStatusMutation} = adminApiSlice;