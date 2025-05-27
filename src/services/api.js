import axios from 'axios';

// Créer une instance axios avec la configuration de base
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajustez l'URL selon votre backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 