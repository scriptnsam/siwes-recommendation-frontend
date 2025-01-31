import { useEffect, useState } from "react";
import {
  FaUser,
  FaBars,
  FaTimes,
  FaArrowRight,
  FaMailBulk,
  FaChartPie,
  FaRegObjectGroup,
} from "react-icons/fa";
import { clearToken } from "../../features/auth/adminAuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { applications, applicationsSaved } = useSelector(
    (state) => state.companyApplications
  );
  const [companyName, setCompanyName] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (applicationsSaved && applications.company) {
      setCompanyName(applications[0].company.company_name);
    }
  }, []);

  return (
    <div>
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden bg-gradient-to-r from-orange-800 to-black p-4">
        <button onClick={toggleSidebar} className="text-white">
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`lg:w-72 w-full bg-gradient-to-b from-orange-800 to-black text-white flex flex-col p-4 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static top-0 left-0 h-full`}
      >
        {/* Close Button for Mobile */}
        <div className="lg:hidden absolute top-4 right-4">
          <button onClick={toggleSidebar} className="text-white">
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-xl font-bold">
            {/* Placeholder for Profile Image */}
            {/* <span className="text-white">AB</span> */}
            <img src="/illustrations/Mavatar.svg" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{companyName}</h3>
            <p className="text-sm">Admin</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col space-y-2">
          <button
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            onClick={() => setActiveTab("overview")}
          >
            <FaChartPie className="text-xl" />
            <span className="font-medium">Overview</span>
          </button>

          <button
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            onClick={() => setActiveTab("applications")}
          >
            <FaMailBulk className="text-xl" />
            <span className="font-medium">Applications</span>
          </button>

          <button
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            onClick={() => setActiveTab("students")}
          >
            <FaUser className="text-xl" />
            <span className="font-medium">Students</span>
          </button>

          <button
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            onClick={() => setActiveTab("companies")}
          >
            <FaRegObjectGroup className="text-xl" />
            <span className="font-medium">Companies</span>
          </button>

          <button
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            onClick={() => dispatch(clearToken())}
          >
            <FaArrowRight className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>

        {/* Spacer */}
        <div className="mt-auto text-center text-sm text-gray-400">
          © 2025 SIWES Connect Dashboard
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
