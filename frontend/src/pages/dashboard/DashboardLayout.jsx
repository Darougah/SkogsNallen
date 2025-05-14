import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-start border">
      <aside className="w-full md:w-1/4 lg:w-1/5 border-r bg-white min-h-screen">
        {renderDashboard()}
      </aside>
      <main className="w-full md:w-3/4 lg:w-4/5 p-8 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
