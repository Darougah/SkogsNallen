
import React, { useState } from 'react';
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';

const UpdateOrderModal = ({ order, isOpen, onClose }) => {
  const [status, setStatus] = useState(order?.status);
  const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

  const handleUpdateOrderStatus = async () => {
    try {
      await updateOrderStatus({ id: order?._id, status }).unwrap();
      alert("Orderstatus uppdaterad");
      onClose();
    } catch (err) {
      console.error("Kunde inte uppdatera orderstatus", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Uppdatera Orderstatus</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="Mottagen">Mottagen</option>
            <option value="Behandlas">Behandlas</option>
            <option value="Skickad">Skickad</option>
            <option value="Klar">Klar</option>
          </select>
        </div>

        {error && <p className="text-red-500 mb-4">Kunde inte uppdatera status.</p>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Avbryt
          </button>
          <button
            onClick={handleUpdateOrderStatus}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? 'Uppdaterar...' : 'Spara'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
