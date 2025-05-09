
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
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading users data: {error?.message}</div>}

      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center justify-between">
                <h3 className="font-semibold text-base text-blueGray-700">Alla Users</h3>
              </div>
              <h3 className="my-4 text-sm">
                Visar {startUser} till {endUser} av {totalUsers} användare
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">No.</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">User email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">User role</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Edit</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td className="px-6 py-2 text-sm text-gray-800">{startUser + index}</td>
                      <td className="px-6 py-2 text-sm">{user?.email || 'N/A'}</td>
                     <td className="px-6 py-2 text-sm">
  <span
    className={`px-2 py-1 text-xs rounded-full text-white ${
      user?.role === 'admin' ? 'bg-purple-600' : 'bg-yellow-600'
    }`}
  >
    {user?.role === 'admin' ? 'Admin' : 'Användare'}
  </span>
</td>
                      <td className="px-6 py-2 text-sm">
                        <button
                          onClick={() => handleEdit(user)}
                          className="flex gap-1 items-center hover:text-red-500"
                        >
                          <i className="ri-edit-2-line"></i>
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-2 text-sm">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Radera
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Föregående
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md mx-1 ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
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
