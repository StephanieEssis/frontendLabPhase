import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier l'utilisateur au chargement et lors des changements
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleRestClick = (e) => {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (!user) {
      e.preventDefault();
      navigate('/login', { state: { from: location.pathname } });
    }
    // Si c'est un admin ou un utilisateur connecté, permettre l'accès direct
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">MyLanLodge</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className={`text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/' ? 'border-purple-500' : 'border-transparent hover:border-purple-300'
                }`}
              >
                Accueil
              </Link>
              <Link
                to="/rooms"
                className={`text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/rooms' ? 'border-purple-500' : 'border-transparent hover:border-purple-300'
                }`}
              >
                Chambres
              </Link>
              <Link
                to="/reservation"
                onClick={handleRestClick}
                className={`text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/reservation' ? 'border-purple-500' : 'border-transparent hover:border-purple-300'
                }`}
              >
                Réservation
              </Link>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm px-4 py-2 rounded-md ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'admin' ? '👑 Admin' : '👤 Client'}: {user.email}
                  </span>
                  
                  {user.role === 'admin' && (
                    <Link
                      to="/dashboard"
                      className={`text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        location.pathname === '/dashboard' ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-expanded="false"
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              {/* Icon menu */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon fermer */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/' 
                ? 'bg-purple-50 border-purple-500 text-purple-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
          >
            Accueil
          </Link>
          <Link
            to="/rooms"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/rooms'
                ? 'bg-purple-50 border-purple-500 text-purple-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
          >
            Chambres
          </Link>
          <Link
            to="/reservation"
            onClick={handleRestClick}
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              location.pathname === '/reservation'
                ? 'bg-purple-50 border-purple-500 text-purple-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
          >
            Réservation
          </Link>
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="space-y-1">
              <div className={`px-4 py-2 text-sm ${
                user.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
              }`}>
                {user.role === 'admin' ? '👑 Admin' : '👤 Client'}: {user.email}
              </div>
              {user.role === 'admin' && (
                <Link
                  to="/dashboard"
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    location.pathname === '/dashboard'
                      ? 'bg-purple-50 border-purple-500 text-purple-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                to="/login"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Inscription
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
