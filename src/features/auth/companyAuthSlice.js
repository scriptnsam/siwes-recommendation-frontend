import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: [], // Store the token here
  isAuthenticated: false,
};

const companyAuthSlice = createSlice({
  name: "companyAuth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload; // Set to true if token exists
      localStorage.setItem('company_token', action.payload.token); // Save token to localStorage
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('company_token'); // Remove token from localStorage
    },
  },
});

export const { setToken, clearToken } = companyAuthSlice.actions;

export default companyAuthSlice.reducer;