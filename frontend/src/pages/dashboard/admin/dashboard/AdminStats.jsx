import React from 'react';

const AdminStats = ({ stats }) => {
  return (
    <div className="my-5 space-y-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-transform duration-200 cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Totala intäkter</h2>
          <p className="text-2xl font-bold">{stats?.totalEarnings ?? 0} kr</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-transform duration-200 cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Alla beställningar</h2>
          <p className="text-2xl font-bold">{stats?.totalOrders ?? 0}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-transform duration-200 cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Alla användare</h2>
          <p className="text-2xl font-bold">{stats?.totalUsers ?? 0}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-transform duration-200 cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Totalt antal produkter</h2>
          <p className="text-2xl font-bold">{stats?.totalProducts ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
