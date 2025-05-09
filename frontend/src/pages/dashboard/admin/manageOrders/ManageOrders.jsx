
import React, { useState } from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orders/orderApi'
import { formatDate } from '../../../../utils/formatDate';
import UpdateOrderModal from './UpdateOrderModal';
import { Link } from 'react-router-dom';

const ManageOrders = () => {
  const { data, error, isLoading, refetch } = useGetAllOrdersQuery();
  const orders = data?.orders || [];
  const [selectedOrder , setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleEditOrder = (order ) =>{
    setSelectedOrder(order);
    setIsModalOpen(true);
  }

  const handleCloseModal = () =>{
    setIsModalOpen(false);
    setSelectedOrder(null);
  }

  const handleDeleteOrder = async(orderId)=>{
    try {
      await deleteOrder(orderId).unwrap();
      alert("Beställningen har raderats");
      refetch()
    } catch (error) {
      console.error("Kunde inte radera beställning: ", error);
    }
  }

  if(isLoading) return <div>Laddar...</div>
  if(error) return <div>Något gick fel</div>

  return (
    <div className='section__container p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Hantera Beställningar</h2>
      <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='py-3 px-4 border-b'>Order-ID</th>
            <th className='py-3 px-4 border-b'>Kund</th>
            <th className='py-3 px-4 border-b'>Status</th>
            <th className='py-3 px-4 border-b'>Datum</th>
            <th className='py-3 px-4 border-b'>Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className='py-3 px-4 border-b'>{order?.orderId}</td>
              <td className='py-3 px-4 border-b'>{order?.email}</td>
              <td className='py-3 px-4 border-b'>
                <span className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order?.status)}`}>
                  {order?.status}
                </span>
              </td>
              <td className='py-3 px-4 border-b'>{formatDate(order?.updatedAt)}</td>
              <td className='py-3 px-4 border-b flex items-center space-x-4'>
                <Link to={`/orders/${order._id}`} className="text-blue-500 hover:underline">Visa</Link>
                <button className='text-green-500 hover:underline' onClick={() => handleEditOrder(order)}>Redigera</button>
                <button className='text-red-500 hover:underline' onClick={() => handleDeleteOrder(order?._id)}>Radera</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <UpdateOrderModal 
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

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
}

export default ManageOrders;
