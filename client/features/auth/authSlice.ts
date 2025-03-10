import { AuthState, User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  userInfo: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    setUserDetails(state, action: PayloadAction<User>) {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    updateVendorVerification(state,action:PayloadAction<boolean>){
      if(state.userInfo && state.userInfo.role=='vendor'){
         state.userInfo.isVerified=action.payload
      }
    },
    logout(state) {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const isVendorVerified =((state: {auth: AuthState})=>
  state.auth.userInfo?.role=='vendor' && state.auth.userInfo?.isVerified===true
)
export const { setUserDetails, logout} = authSlice.actions;
export default authSlice.reducer;