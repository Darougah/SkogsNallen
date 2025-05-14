import React, { useState } from 'react';
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi';
import { formatDate } from '../../../../utils/formatDate';
import UpdateOrderModal from './UpdateOrderModal';
import { Link } from 'react-router-dom';

const getStatusColor = (status) => {
  switch (status) {
    case 'Mottagen':
      return 'bg-yellow-500';
    case 'Behandlas':
      return 'bg-blue-500';
    case 'Skickad':
      return 'bg-green-500';
    case 'Klar':
      return 'bg-purple-500';
    default:
      return 'bg-gray-300';
  }
};

const ManageOrders = () => {
  const { data, error, isLoading, refetch } = useGetAllOrdersQuery();
  const orders = data?.orders || [];
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      alert('Beställningen har raderats');
      refetch();
    } catch (error) {
      console.error('Kunde inte radera beställning: ', error);
    }
  };

  if (isLoading) return <div className="text-center py-6">Laddar...</div>;
  if (error) return <div className="text-center text-red-500 py-6">Något gick fel</div>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-4">Hantera Beställningar</h2>


      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">Order-ID</th>
              <th className="py-3 px-4 border-b text-left">Kund</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
              <th className="py-3 px-4 border-b text-left">Datum</th>
              <th className="py-3 px-4 border-b text-left">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="py-3 px-4 border-b max-w-[200px] truncate" title={order.orderId}>
                  {order.orderId}
                </td>
                <td className="py-3 px-4 border-b max-w-[200px] truncate" title={order.email}>
                  {order.email}
                </td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">{formatDate(order.updatedAt)}</td>
<td className="py-3 px-4 border-b">
  <div className="flex flex-wrap items-center gap-4">
    <Link to={`/orders/${order._id}`} className="text-blue-500 hover:underline text-sm">Visa</Link>
    <button onClick={() => handleEditOrder(order)} className="text-green-600 hover:underline text-sm">
      Redigera
    </button>
    <button onClick={() => handleDeleteOrder(order._id)} className="text-red-500 hover:underline text-sm">
      Radera
    </button>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="block sm:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 shadow-sm bg-white">
            <p className="text-sm truncate"><span className="font-semibold">Order-ID:</span> <span title={order.orderId}>{order.orderId}</span></p>
            <p className="text-sm truncate"><span className="font-semibold">Kund:</span> <span title={order.email}>{order.email}</span></p>
            <p className="text-sm">
              <span className="font-semibold">Status:</span>{' '}
              <span className={`inline-block px-2 py-1 text-xs text-white rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </p>
            <p className="text-sm"><span className="font-semibold">Datum:</span> {formatDate(order.updatedAt)}</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <Link to={`/orders/${order._id}`} className="text-blue-500 text-sm hover:underline">Visa</Link>
              <button onClick={() => handleEditOrder(order)} className="text-green-600 text-sm hover:underline">
                Redigera
              </button>
              <button onClick={() => handleDeleteOrder(order._id)} className="text-red-500 text-sm hover:underline">
                Radera
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ManageOrders;
