import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import AdminLoginPage from "./Login";
import { setToken } from "../../features/auth/adminAuthSlice";
import OverView from "./Overview";
import Applications from "./Applications";
import Students from "./Students";
import Companies from "./CompaniesTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview"); // Track active tab
  const { isAuthenticated } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverView />;
      case "students":
        return <Students setActiveTab={setActiveTab} />;
      case "companies":
        return <Companies setActiveTab={setActiveTab} />;
      case "applications":
        return <Applications setActiveTab={setActiveTab} />;
      default:
        return <OverView />;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      dispatch(setToken({ token })); // Rehydrate auth state
    }
  }, [dispatch]);

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <div className="flex max-lg:block bg-gray-100 min-h-screen ">
      <Sidebar setActiveTab={setActiveTab} />
      <main className="flex-1">{renderTabContent()}</main>
    </div>
  );
};

export default AdminDashboard;
