import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import companyAuthReducer from '../features/auth/companyAuthSlice';
import companyApplicationsReducer from '../features/details/applicationsDetails';

const store = configureStore({
  reducer: {
    auth: authReducer,
    companyAuth: companyAuthReducer,
    companyApplications: companyApplicationsReducer
  }
});

export default store;