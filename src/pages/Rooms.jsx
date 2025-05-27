import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomList from '../components/rooms/RoomList';

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Nos Chambres
          </h1>
          <p className="text-gray-600 text-lg">
            Découvrez nos chambres luxueuses et confortables
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => (
            <div key={room.id} className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-purple-600 font-semibold">{room.price.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{room.size}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">Max {room.maxGuests} pers.</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-sm text-gray-600">{room.rating}</span>
                    <span className="text-sm text-gray-400 ml-1">({room.reviews})</span>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate(`/rooms/${room.id}`)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
