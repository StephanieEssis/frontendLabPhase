import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulons un appel API - à remplacer par un vrai appel API plus tard
    const fetchRoom = () => {
      // Données mockées
      const mockRooms = {
        1: {
          id: 1,
          name: 'Suite Royale',
          description: 'Un luxe inégalé avec jacuzzi et vue panoramique.',
          longDescription: 'Profitez d\'un espace généreux et d\'équipements haut de gamme pour un séjour exceptionnel. Notre Suite Royale offre une expérience unique avec sa vue panoramique sur la ville et son jacuzzi privé.',
          price: 80000,
          image: '/images/royal1.avif',
          images: [
            '/images/royal1.avif',
            '/images/royal2.avif',
            '/images/royal3.avif'
          ],
          amenities: [
            'Jacuzzi privé',
            'Vue panoramique',
            'Lit king-size',
            'Wifi haut débit',
            'Room service 24/7',
            'Mini bar',
            'Climatisation',
            'Coffre-fort',
            'TV écran plat'
          ],
          size: '45m²',
          maxGuests: 2,
          rating: 4.8,
          reviews: 124
        },
        2: {
          id: 2,
          name: 'Chambre Deluxe',
          description: 'Élégance et confort pour un séjour mémorable.',
          longDescription: 'Notre Chambre Deluxe allie élégance et modernité pour vous offrir un confort optimal. Profitez d\'un espace bien pensé et d\'équipements premium.',
          price: 75000,
          image: '/images/deluxe.avif',
          images: [
            '/images/deluxe.avif',
            '/images/deluxe2.avif',
            '/images/deluxe3.avif'
          ],
          amenities: [
            'Lit queen-size',
            'Wifi haut débit',
            'Mini bar',
            'Climatisation',
            'Coffre-fort',
            'TV écran plat'
          ],
          size: '35m²',
          maxGuests: 2,
          rating: 4.6,
          reviews: 98
        },
        3: {
          id: 3,
          name: 'Chambre Éco Chic',
          description: 'Le parfait équilibre entre confort et budget.',
          longDescription: 'Une chambre moderne et confortable à prix abordable. Idéale pour les voyageurs qui cherchent le meilleur rapport qualité-prix.',
          price: 50000,
          image: '/images/stand2.png',
          images: [
            '/images/stand2.png',
            '/images/ecochic.avif',
            '/images/stand3.png'
          ],
          amenities: [
            'Lit double',
            'Wifi',
            'Climatisation',
            'TV écran plat'
          ],
          size: '25m²',
          maxGuests: 2,
          rating: 4.4,
          reviews: 156
        }
      };

      setTimeout(() => {
        const foundRoom = mockRooms[id];
        setRoom(foundRoom || null);
        setLoading(false);
      }, 500);
    };

    fetchRoom();
  }, [id]);

  const handleReservation = () => {
    // Stocker les informations de la chambre pour la page de réservation
    navigate('/reservation', {
      state: { 
        selectedRoom: {
          id: room.id,
          name: room.name,
          price: room.price,
          maxGuests: room.maxGuests
        }
      }
    });
  };

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
        <button
          onClick={() => navigate('/rooms')}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          Voir toutes nos chambres
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Galerie d'images */}
          <div className="relative h-96 grid grid-cols-2 gap-4 p-4">
            <div className="col-span-1 h-full">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-4">
              {room.images.slice(1, 3).map((image, index) => (
                <div key={index} className="relative h-full">
                  <img
                    src={image}
                    alt={`${room.name} - Vue ${index + 2}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Informations de la chambre */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h1>
                <p className="text-gray-600">{room.longDescription}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {room.price.toLocaleString('fr-FR')} FCFA
                </div>
                <div className="text-sm text-gray-500">par nuit</div>
              </div>
            </div>

            {/* Caractéristiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">✨</span> Caractéristiques
                </h2>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Superficie:</span>
                      <span className="font-medium">{room.size}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Capacité:</span>
                      <span className="font-medium">Max {room.maxGuests} pers.</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Note:</span>
                      <span className="font-medium flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        {room.rating}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Avis:</span>
                      <span className="font-medium">{room.reviews}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">🛋️</span> Équipements
                </h2>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-purple-600">•</span>
                        <span className="text-gray-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton de réservation */}
            <div className="flex justify-center">
              <button
                onClick={handleReservation}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full font-medium text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Réserver maintenant ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail; 