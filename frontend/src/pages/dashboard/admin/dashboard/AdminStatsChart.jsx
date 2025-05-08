
import React from "react";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const AdminStatsChart = ({ stats }) => {
  console.log(stats);

  const pieData = {
    labels: ["Totala beställningar", "Totala produkter", "Totala recensioner", "Totala användare"],
    datasets: [
      {
        label: "Adminstatistik",
        data: [
          stats?.totalOrders || 0,
          stats?.totalProducts || 0,
          stats?.totalReviews || 0,
          stats?.totalUsers || 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const earningsData = new Array(12).fill(0);
  stats?.monthlyEarnings?.forEach((entry) => {
    if (entry?.month && entry?.earnings !== undefined) {
      earningsData[entry.month - 1] = entry.earnings;
    }
  });

  const lineData = {
    labels: [
      "Januari", "Februari", "Mars", "April", "Maj", "Juni",
      "Juli", "Augusti", "September", "Oktober", "November", "December"
    ],
    datasets: [
      {
        label: "Månatliga intäkter (kr)",
        data: earningsData,
        fill: false,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  return (
    <div className="mt-12 space-y-12">
      <h2 className="text-xl font-semibold">Översikt - Admin statistik</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="max-h-96 md:h-96 w-full bg-white p-4 rounded shadow">
          <Pie data={pieData} options={options} />
        </div>
        <div className="max-h-96 md:h-96 w-full bg-white p-4 rounded shadow">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatsChart;
