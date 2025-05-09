
import React, { useState } from 'react';
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user.role);
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleUpdateRole = async () => {
    try {
      await updateUserRole({ userId: user?._id, role }).unwrap();
      alert('Updated role successfully');
      onRoleUpdate();
      onClose();
    } catch (error) {
      console.error('Failed to update user role', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4 font-semibold">Redigera användarroll</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Roll</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-300"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
          >
            Avbryt
          </button>
          <button
            onClick={handleUpdateRole}
            className="bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Spara
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
