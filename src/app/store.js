import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import companyAuthReducer from "../features/auth/companyAuthSlice";
import companyApplicationsReducer from "../features/details/applicationsDetails";
import adminAuthReducer from "../features/auth/adminAuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    companyAuth: companyAuthReducer,
    adminAuth: adminAuthReducer,
    companyApplications: companyApplicationsReducer,
  },
});

export default store;
