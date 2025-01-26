import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: null, // Store applications data here (removed incorrect token comment)
  applicationsSaved: false,
};

const companyApplicationsSlice = createSlice({
  name: "companyApplications", // Fixed slice name to match its purpose
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload.applications;
      state.applicationsSaved = !!action.payload.applications; // Fixed to check applications specifically
    },
    clearApplications: (state) => {
      state.applications = null;
      state.applicationsSaved = false;
    },
  },
});

export const { setApplications, clearApplications } = companyApplicationsSlice.actions;

export default companyApplicationsSlice.reducer;
