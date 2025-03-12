// src/api/baseQuery.js
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from 'async-mutex';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const mutex = new Mutex();

// Create a factory function that generates baseQuery with reauth for different slice paths
export const createBaseQueryWithReauth = (basePath: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${apiUrl}${basePath}`,
    credentials: 'include'
  });

  return async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    // Wait if another query is already refreshing the token
    await mutex.waitForUnlock();
    
    let result = await baseQuery(args, api, extraOptions);
    
    if (result.error && result.error.status === 401) {
      // Check if mutex is locked to prevent multiple refresh requests
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        
        try {
          // We'll use a common refresh endpoint - adjust the path as needed for your API
          const refreshResult = await fetchBaseQuery({
            baseUrl: `${apiUrl}${basePath}`,
            credentials: 'include'
          })(
            { url: `/refresh-token`, method: 'POST' },
            api,
            extraOptions
          );
          
          if (refreshResult.data) {
            // Retry the original query with the new token
            result = await baseQuery(args, api, extraOptions);
          } else {
            // Handle failed refresh (e.g., redirect to login)
            // api.dispatch(logoutUser());
          }
        } finally {
          release();
        }
      } else {
        // Wait for the mutex to be unlocked (token is being refreshed)
        await mutex.waitForUnlock();
        // Retry the request
        result = await baseQuery(args, api, extraOptions);
      }
    }
    return result;
  };
};