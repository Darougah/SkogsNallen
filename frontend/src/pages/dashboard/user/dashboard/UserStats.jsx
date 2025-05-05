
import React from 'react'

const UserStats = ({ stats }) => {
  return (
    <div className="my-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Payments */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-green-500 transition-all">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Totala betalningar</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats?.totalPayments} kr
          </p>
        </div>

        {/* Total Reviews */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-green-500 transition-all">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Antal recensioner</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {stats?.totalReviews}
          </p>
        </div>

        {/* Purchased Products */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:shadow-md hover:border-green-500 transition-all">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Köpta produkter</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.totalPurchasedProducts}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserStats
