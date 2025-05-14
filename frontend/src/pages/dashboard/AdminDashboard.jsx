
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { logout } from '../../redux/features/auth/authSlice';

const navItems = [
  { path: '/dashboard/admin', label: 'Adminpanel' },
  { path: '/dashboard/add-product', label: 'Lägg till produkt' },
  { path: '/dashboard/manage-products', label: 'Hantera produkter' },
  { path: '/dashboard/users', label: 'Användare' },
  { path: '/dashboard/manage-orders', label: 'Hantera beställningar' },
];

const AdminDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Misslyckades med att logga ut', error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-screen p-6 bg-white">
      <div>
        <div className="mb-4">
          <Link to="/" className="text-2xl font-bold">
            SkogsNallen<span className="text-green-600">.</span>
          </Link>
          <p className="text-sm italic text-gray-500">Adminpanel</p>
        </div>
        <hr className="border-gray-200 mb-4" />
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-700 font-bold'
                    : 'text-black hover:text-green-600'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="w-full bg-green-600 text-white font-medium px-5 py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Logga ut
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
