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
    logout(state) {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserDetails, logout} = authSlice.actions;
export default authSlice.reducer;