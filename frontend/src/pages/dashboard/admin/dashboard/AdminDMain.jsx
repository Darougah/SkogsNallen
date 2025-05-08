import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi';
import AdminStats from './AdminStats';
import AdminStatsChart from './AdminStatsChart';

const AdminDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetAdminStatsQuery();

  if (isLoading) return <div className="p-6 text-gray-600">Laddar statistik...</div>;
  if (error) return <div className="p-6 text-red-500">Kunde inte ladda statistik!</div>;
  if (!stats) return <div className="p-6 text-gray-500">Ingen statistik hittades.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Adminpanel</h1>
      <p className="text-gray-600 mb-6">Hej {user?.username}! Välkommen till Adminpanelen.</p>

      <AdminStats stats={stats} />
      <AdminStatsChart stats={stats} />
    </div>
  );
};

export default AdminDMain;
