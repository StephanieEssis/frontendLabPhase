import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Récupérer l'utilisateur du localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // Vérifier si l'utilisateur est connecté et est un admin
  if (!user || user.role !== 'admin') {
    // Rediriger vers la page de connexion si non connecté ou non admin
    return <Navigate to="/login" replace />;
  }

  // Rendre le composant protégé si l'utilisateur est un admin
  return children;
};

export default PrivateRoute; 