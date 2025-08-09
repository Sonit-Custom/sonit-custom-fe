import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout; 