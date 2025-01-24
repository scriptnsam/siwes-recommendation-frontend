import { useState } from 'react';
import { FaHome, FaUser, FaCog, FaBars, FaTimes, FaArrowRight, FaMailBulk } from 'react-icons/fa';
import { clearToken } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Sidebar = ({ setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden bg-gradient-to-r from-teal-800 to-black p-4">
        <button onClick={toggleSidebar} className="text-white">
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`lg:w-72 w-full bg-gradient-to-b from-teal-800 to-black text-white flex flex-col p-4 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
            <img src='/illustrations/Mavatar.svg' />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Dashboard</h3>
            <p className="text-sm">Student</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col space-y-2">
          <button
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => setActiveTab('home')}
          >
            <FaHome className="text-xl" />
            <span className="font-medium">Home</span>
          </button>

          <button
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="text-xl" />
            <span className="font-medium">Profile</span>
          </button>

          <button
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => setActiveTab('applications')}
          >
            <FaMailBulk className="text-xl" />
            <span className="font-medium">Applications</span>
          </button>

          <button
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => setActiveTab('settings')}
          >
            <FaCog className="text-xl" />
            <span className="font-medium">Settings</span>
          </button>

          <button
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors"
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