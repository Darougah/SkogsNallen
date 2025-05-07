import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/orderApi';

const statusLabelMap = {
  completed: 'Klar',
  pending: 'Mottagen',
  processing: 'Behandlas',
  shipped: 'Skickad',
};

const statusColorMap = {
  Klar: 'bg-green-800 text-white',
  Mottagen: 'bg-red-500 text-white',
  Behandlas: 'bg-yellow-800 text-white',
  Skickad: 'bg-blue-800 text-white',
};

const UserPayments = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: ordersData, error, isLoading } = useGetOrdersByEmailQuery(user?.email);

  if (isLoading) return <div className="text-center py-6">Laddar...</div>;
  if (error || !ordersData?.orders?.length) {
    return <div className="text-center py-6 text-red-500">Inga betalningar hittades.</div>;
  }

  const orders = ordersData.orders;
  const totalPayment = orders.reduce((acc, order) => acc + order.amount, 0).toFixed(2);

  return (
    <section className="py-6">
      <div className="w-full px-4 mx-auto">
        <div className="bg-white shadow-lg rounded border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Betalningshistorik</h3>
            <p className="text-gray-600 mt-1">Totalt spenderat: {totalPayment} kr</p>
          </div>

          <div className="p-6">
            <ul className="space-y-5">
              {orders.map((item, index) => {
                const swedishStatus = statusLabelMap[item.status] || item.status;
                const statusClass = statusColorMap[swedishStatus] || 'bg-gray-100 text-gray-700';
                return (
                  <li key={item._id} className="border p-4 rounded hover:shadow transition">
                    <h4 className="font-medium text-gray-800 mb-1">Order #{index + 1}</h4>
                    <p className="text-gray-600">Belopp: {item.amount.toFixed(2)} kr</p>
                    <p className="text-gray-600">Datum: {new Date(item.createdAt).toLocaleString('sv-SE')}</p>
                    <p className="mt-1">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusClass}`}>
                        {swedishStatus}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPayments;
