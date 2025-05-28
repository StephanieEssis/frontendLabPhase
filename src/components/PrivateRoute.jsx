import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const location = useLocation();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem('token');

  if (!token || !user) {
    // Rediriger vers la connexion en sauvegardant la page d'origine
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Vérifier les permissions admin si nécessaire
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute; 