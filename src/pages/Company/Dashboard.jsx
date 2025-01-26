import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
// import ProfileTab from './ProfileTab';
// import SettingsTab from './SettingsTab';
import { useSelector, useDispatch } from 'react-redux';
import CompantLoginPage from './Login'
import { setToken } from '../../features/auth/companyAuthSlice';
import OverView from './Overview';
// import Applications from './Applications';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // Track active tab
  const { isAuthenticated } = useSelector((state) => state.companyAuth);
  const dispatch = useDispatch();


  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverView />;
      // case 'profile':
      //   return <ProfileTab />;
      // case 'applications':
      //   return <Applications setActiveTab={setActiveTab} />;
      // case 'settings':
      //   return <SettingsTab setActiveTab={setActiveTab} />;
      default:
        return <OverView />;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('company_token');
    if (token) {
      dispatch(setToken({ token })) // Rehydrate auth state
    }
  }, [dispatch])

  if (!isAuthenticated) {
    return <CompantLoginPage />;
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

export default CompanyDashboard;
