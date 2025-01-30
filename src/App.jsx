import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./pages/components/Header";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/Login";
import Footer from "./pages/components/Footer";
import { Provider } from "react-redux";
import store from "./app/store";
import Dashboard from "./pages/components/Dashboard";
import CompanyLoginPage from "./pages/Company/Login";
import CompanySignUp from "./pages/Company/SignUp";
import CompanyDashboard from "./pages/Company/Dashboard";

import AdminLoginPage from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <LandingPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header />
                <SignUp />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <LoginPage />
                <Footer />
              </>
            }
          />

          {/* Company Routes */}
          <Route
            path="/company/login"
            element={
              <>
                <Header />
                <CompanyLoginPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/company/signup"
            element={
              <>
                <Header />
                <CompanySignUp />
                <Footer />
              </>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/signin"
            element={
              <>
                <Header />
                <AdminLoginPage />
                <Footer />
              </>
            }
          />

          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
