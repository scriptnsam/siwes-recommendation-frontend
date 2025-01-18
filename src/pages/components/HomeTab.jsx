import React from 'react';
import RecentActivity from './RecentActivity';

const HomeTab = () => {
  return (
    <div className="bg-gray-50 p-6 h-full rounded-lg shadow-md">
      {/* Welcome Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-600">Welcome Back!</h1>
        <p className="text-gray-600 text-lg mt-2">
          Your dashboard is your gateway to everything you need. Let’s get started!
        </p>
      </div>

      {/* Overview Sections with Illustrative Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition">
          <div className="h-32 bg-blue-100 rounded-md mb-4 flex items-center justify-center">
            <img
              src="/illustrations/profile.svg"
              alt="Profile Illustration"
              className="h-20"
            />
          </div>
          <h2 className="text-xl font-semibold text-blue-600 text-center">Profile</h2>
          <p className="text-gray-600 text-center mt-2">View and update your details.</p>
        </div>

        {/* Tasks Overview */}
        <div className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-green-50 transition">
          <div className="h-32 bg-green-100 rounded-md mb-4 flex items-center justify-center">
            <img
              src="/illustrations/tasks.svg"
              alt="Tasks Illustration"
              className="h-20"
            />
          </div>
          <h2 className="text-xl font-semibold text-green-600 text-center">Tasks</h2>
          <p className="text-gray-600 text-center mt-2">Stay on top of your activities.</p>
        </div>

        {/* Settings Overview */}
        <div className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-50 transition">
          <div className="h-32 bg-yellow-100 rounded-md mb-4 flex items-center justify-center">
            <img
              src="/illustrations/settings.svg"
              alt="Settings Illustration"
              className="h-20"
            />
          </div>
          <h2 className="text-xl font-semibold text-yellow-600 text-center">Settings</h2>
          <p className="text-gray-600 text-center mt-2">
            Personalize your experience.
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className='mt-5'>
        <RecentActivity
          activities={[
            {
              description: "User logged in",
              timestamp: new Date().toLocaleString()
            },
            {
              description: "Profile updated",
              timestamp: new Date().toLocaleString()
            }
          ]}
        />
      </div>
    </div>
  );
};

export default HomeTab;
