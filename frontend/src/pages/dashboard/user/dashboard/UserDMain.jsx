import React from 'react';
import { useSelector } from 'react-redux';
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import UserStats from './UserStats';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);

  if (isLoading) return <div className='text-center text-gray-500'>Laddar...</div>;
  if (!stats) return <div className='text-center text-gray-500'>Ingen data tillgänglig.</div>;
  if (error) return <div className='text-center text-red-500'>Något gick fel.</div>;

  const data = {
    labels: ['Totala betalningar', 'Antal recensioner ×100', 'Köpta produkter ×100'],
    datasets: [
      {
        label: 'Användarstatistik',
        data: [
          stats.totalPayments,
          stats.totalReviews * 100,
          stats.totalPurchasedProducts * 100,
        ],
        backgroundColor: [
          'rgba(75, 192,192,0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192,192,1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label;
            const value = tooltipItem.raw;
            if (label.includes('recensioner')) {
              return `Antal recensioner: ${value / 100}`;
            }
            if (label.includes('produkter')) {
              return `Köpta produkter: ${value / 100}`;
            }
            return `Totala betalningar: ${value.toFixed(2)} kr`;
          }
        }
      }
    }
  };

  return (
    <div className='p-6'>
      <div>
        <h1 className='text-2xl font-semibold mb-4'>Användarpanel</h1>
        <p className='text-gray-500'>Hej, {user?.username}! Välkommen till din kontrollpanel.</p>
      </div>

      <UserStats stats={stats} />

      <div className='mb-6 mt-8'>
        <h2 className='text-xl font-semibold mb-3'>Statistikdiagram</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserDMain;
