import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { apiAuthSlice } from "@/features/api/auth/apiAuthSlice";
import authReducer from "@/features/auth/authSlice";
import { vendorApiSlice } from "@/features/api/vendor/vendorApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApiSlice } from "@/features/api/admin/adminApiSlice";

export const store = configureStore({
  reducer: {
    [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
    auth: authReducer,
    [vendorApiSlice.reducerPath]: vendorApiSlice.reducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiAuthSlice.middleware)
      .concat(vendorApiSlice.middleware)
      .concat(adminApiSlice.middleware),
});

setupListeners(store.dispatch);

//type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

//wrapper for next.js
//export const wrapper = createWrapper(makeStore)
