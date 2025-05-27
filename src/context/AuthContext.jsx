import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au montage, on récupère token + user en localStorage pour persister la session
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fonction de login simulée
  const login = async (email, password) => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simuler une vérification basique
    if (email && password.length >= 6) {
      const mockUser = { id: 1, email };
      const mockToken = 'mock-jwt-token-' + Math.random();
      
      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      throw new Error('Email ou mot de passe invalide');
    }
  };

  // Fonction de register simulée
  const register = async (email, password) => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simuler une vérification basique
    if (email && password.length >= 6) {
      // En mode simulation, on considère que l'inscription est toujours réussie
      return true;
    } else {
      throw new Error('Données d\'inscription invalides');
    }
  };

  // Déconnexion
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 