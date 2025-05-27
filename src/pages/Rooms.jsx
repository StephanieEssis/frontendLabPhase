import React, { useState, useEffect } from 'react';
import RoomList from '../components/rooms/RoomList';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    price: 'all',
    capacity: 'all',
    type: 'all'
  });
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Simulons un appel API - à remplacer par un vrai appel API plus tard
    const fetchRooms = () => {
      const mockRooms = [
        {
          id: 1,
          name: 'Suite Royale',
          description: 'Un luxe inégalé avec jacuzzi et vue panoramique.',
          price: 80000,
          image: '/images/royal1.avif',
          rating: 4.8,
          reviews: 124,
          size: '45m²',
          maxGuests: 2
        },
        {
          id: 2,
          name: 'Chambre Deluxe',
          description: 'Élégance et confort pour un séjour mémorable.',
          price: 75000,
          image: '/images/deluxe.avif',
          rating: 4.6,
          reviews: 98,
          size: '35m²',
          maxGuests: 2
        },
        {
          id: 3,
          name: 'Chambre Éco Chic',
          description: 'Le parfait équilibre entre confort et budget.',
          price: 40000,
          image: '/images/stand2.png',
          rating: 4.4,
          reviews: 156,
          size: '25m²',
          maxGuests: 2
        }
      ];

      setTimeout(() => {
        setRooms(mockRooms);
        setLoading(false);
      }, 500);
    };

    fetchRooms();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* En-tête */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Nos Chambres Magiques ✨
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de chambres conçues pour rendre votre séjour inoubliable.
              Chaque espace est pensé pour votre confort et votre bien-être.
            </p>
          </div>
        </div>
      </div>

      {/* Barre de filtres sticky */}
      <div className={`${
        isSticky 
          ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg transform transition-all duration-300' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="all">Prix (Tous)</option>
              <option value="low">Moins de 100€</option>
              <option value="medium">100€ - 150€</option>
              <option value="high">Plus de 150€</option>
            </select>
            <select
              name="capacity"
              value={filters.capacity}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="all">Capacité (Tous)</option>
              <option value="1">1 personne</option>
              <option value="2">2 personnes</option>
              <option value="3">3+ personnes</option>
            </select>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="all">Type (Tous)</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
              Filtrer ✨
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Liste des chambres */}
        <RoomList rooms={rooms} />

        {/* Informations supplémentaires */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold mb-2">Service 5 étoiles</h3>
            <p className="text-gray-600">Une équipe attentionnée à votre service 24/7</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Design unique</h3>
            <p className="text-gray-600">Chaque chambre a sa propre personnalité</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-3xl mb-4">💝</div>
            <h3 className="text-xl font-semibold mb-2">Expérience magique</h3>
            <p className="text-gray-600">Des moments inoubliables garantis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
