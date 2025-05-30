import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    alert('Du måste vara inloggad!');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    alert('Du har inte behörighet att se denna sida!');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
