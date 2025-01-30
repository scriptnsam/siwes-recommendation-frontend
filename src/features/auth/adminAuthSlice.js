import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: [], // Store the token here
  isAuthenticated: false,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload; // Set to true if token exists
      localStorage.setItem("admin_token", action.payload.token); // Save token to localStorage
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("admin_token"); // Remove token from localStorage
    },
  },
});

export const { setToken, clearToken } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
