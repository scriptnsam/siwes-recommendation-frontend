import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import SettingsTab from './SettingsTab';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from '../Login';
import { setToken } from '../../features/auth/authSlice';
import Applications from './Applications';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home'); // Track active tab
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'profile':
        return <ProfileTab />;
      case 'applications':
        return <Applications setActiveTab={setActiveTab} />;
      case 'settings':
        return <SettingsTab setActiveTab={setActiveTab} />;
      default:
        return <HomeTab />;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken({ token })) // Rehydrate auth state
    }
  }, [dispatch])

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex max-lg:block bg-gray-100 min-h-screen ">
      <Sidebar setActiveTab={setActiveTab} />
      <main className="flex-1">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Dashboard;
