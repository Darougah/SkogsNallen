import React, { useState } from 'react';
import { useDeleteUserMutation, useGetUserQuery } from '../../../../redux/features/auth/authApi';
import UpdateUserModal from './UpdateUserModal';

const ManageUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const { data, error, isLoading, isError, refetch } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.users || [];
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const startUser = (currentPage - 1) * usersPerPage + 1;
  const endUser = Math.min(startUser + usersPerPage - 1, totalUsers);
  const currentUsers = users.slice(startUser - 1, endUser);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      alert('User deleted successfully');
      refetch();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      {isLoading && <div className="text-center py-6">Laddar användare...</div>}
      {isError && <div className="text-center text-red-500 py-6">Fel: {error?.message}</div>}

      <section className="py-6">
        <div className="w-full px-4 mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 className="font-semibold text-lg text-gray-800">Alla användare</h3>
              <p className="text-sm mt-2 sm:mt-0 text-gray-600">
                Visar {startUser} till {endUser} av {totalUsers} användare
              </p>
            </div>
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-gray-50 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-6 py-3 text-left">Nr</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Roll</th>
                    <th className="px-6 py-3 text-left">Redigera</th>
                    <th className="px-6 py-3 text-left">Radera</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{startUser + index}</td>
                      <td className="px-6 py-3 truncate max-w-[220px]" title={user?.email}>{user?.email}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full text-white ${
                            user?.role === 'admin' ? 'bg-purple-600' : 'bg-yellow-600'
                          }`}
                        >
                          {user?.role === 'admin' ? 'Admin' : 'Användare'}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleEdit(user)}
                          className="flex gap-1 items-center hover:text-blue-600"
                        >
                          <i className="ri-edit-2-line"></i> Redigera
                        </button>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Radera
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="block sm:hidden p-4 space-y-4">
              {currentUsers.map((user, index) => (
                <div key={user._id} className="border rounded-lg p-4 shadow-sm">
                  <p className="text-sm"><span className="font-semibold">Nr:</span> {startUser + index}</p>
                  <p className="text-sm truncate"><span className="font-semibold">Email:</span> <span title={user.email}>{user.email}</span></p>
                  <p className="text-sm">
                    <span className="font-semibold">Roll:</span>{' '}
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full text-white ${
                        user?.role === 'admin' ? 'bg-purple-600' : 'bg-yellow-600'
                      }`}
                    >
                      {user?.role === 'admin' ? 'Admin' : 'Användare'}
                    </span>
                  </p>
                  <div className="flex gap-4 mt-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 font-medium text-sm"
                    >
                      Redigera
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Radera
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
          >
            Föregående
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
          >
            Nästa
          </button>
        </div>
      </section>

      {isModalOpen && (
        <UpdateUserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onRoleUpdate={refetch}
        />
      )}
    </>
  );
};

export default ManageUser;
