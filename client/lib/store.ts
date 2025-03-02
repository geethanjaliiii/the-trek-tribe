import  {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from 'next-redux-wrapper'

import { apiAuthSlice } from "@/features/api/auth/apiAuthSlice";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
        reducer: {
            [apiAuthSlice.reducerPath] : apiAuthSlice.reducer,
            auth: authReducer
        },
        middleware:(getDefaultMiddleware) => 
            getDefaultMiddleware().concat(apiAuthSlice.middleware)
    })


//type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

//wrapper for next.js
//export const wrapper = createWrapper(makeStore)
