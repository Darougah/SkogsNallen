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
    <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
      <div>
        <div className='nav__logo mb-2'>
          <Link to="/" className='text-2xl font-bold'>
            SkogsNallen<span className='text-green-600'>.</span>
          </Link>
          <p className='text-xs italic text-gray-500'>Adminpanel</p>
        </div>
        <hr className='my-4 border-gray-200' />
        <ul className='space-y-4'>
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
      <div className='mb-3'>
        <hr className='mb-3' />
        <button
          onClick={handleLogout}
          className='text-white bg-primary font-medium px-5 py-2 rounded-md hover:bg-primary-dark transition'
        >
          Logga ut
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
