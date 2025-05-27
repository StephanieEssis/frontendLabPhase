import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulons un appel API - à remplacer par un vrai appel API plus tard
    const fetchRoom = () => {
      // Données mockées
      const mockRoom = {
        id: parseInt(id),
        name: 'Suite Royale',
        description: 'Un luxe inégalé avec jacuzzi et vue panoramique. Profitez d\'un espace généreux et d\'équipements haut de gamme pour un séjour exceptionnel.',
        price: 180,
        image: '/images/landing.jpeg',
        amenities: ['Jacuzzi privé', 'Vue panoramique', 'Lit king-size', 'Wifi haut débit', 'Room service 24/7', 'Mini bar'],
        size: '45m²',
        maxGuests: 2,
        rating: 4.8,
        reviews: 124
      };

      setTimeout(() => {
        setRoom(mockRoom);
        setLoading(false);
      }, 500);
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chambre non trouvée 😢</h2>
        <Link to="/rooms" className="btn btn-primary">
          Voir toutes nos chambres
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Image Hero */}
          <div className="relative h-96">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{room.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="bg-white/90 text-purple-600 px-4 py-1 rounded-full text-sm font-semibold">
                  {room.price}€/nuit
                </span>
                <span className="text-white flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {room.rating} ({room.reviews} avis)
                </span>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Description */}
              <div className="md:col-span-2 space-y-6">
                <div className="prose max-w-none">
                  <p className="text-gray-600 text-lg">{room.description}</p>
                </div>

                {/* Caractéristiques */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-purple-50 p-4 rounded-2xl text-center">
                    <span className="block text-2xl mb-1">👥</span>
                    <span className="text-sm text-gray-600">Jusqu'à {room.maxGuests} personnes</span>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-2xl text-center">
                    <span className="block text-2xl mb-1">📏</span>
                    <span className="text-sm text-gray-600">{room.size}</span>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-2xl text-center">
                    <span className="block text-2xl mb-1">🛏️</span>
                    <span className="text-sm text-gray-600">Lit king-size</span>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-2xl text-center">
                    <span className="block text-2xl mb-1">🌟</span>
                    <span className="text-sm text-gray-600">{room.rating}/5</span>
                  </div>
                </div>
              </div>

              {/* Réservation */}
              <div className="md:col-span-1">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Réserver cette chambre</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Arrivée</label>
                        <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Départ</label>
                        <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Nombre de personnes</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>1 personne</option>
                        <option>2 personnes</option>
                      </select>
                    </div>
                    <button className="w-full btn btn-primary">
                      Réserver maintenant ✨
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Équipements et services ✨
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail; 