import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null, // Store the token here
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload; // Set to true if token exists
      localStorage.setItem('token', action.payload.token); // Save token to localStorage
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;