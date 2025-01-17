import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import SettingsTab from './SettingsTab';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from '../Login';
import { setToken } from '../../features/auth/authSlice';

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
      case 'settings':
        return <SettingsTab />;
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
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveTab={setActiveTab} />
      <main className="flex-1 p-6">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Dashboard;