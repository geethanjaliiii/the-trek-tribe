import  {configureStore} from "@reduxjs/toolkit";
import adminSlice from './slices/adminSlice'
import clientSlice from './slices/clientSlice'
import vendorSlice from './slices/vendorSlice'
export const store=configureStore({
    reducer:{
        admin:adminSlice,
        vendor:vendorSlice,
        client:clientSlice
    },
    devTools:true
})