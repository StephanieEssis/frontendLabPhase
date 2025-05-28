import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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
            '/images/royal2.avif'
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
            '/images/standeco.avif'
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
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (!token) {
      // Si non connecté, rediriger vers la page de connexion avec un state pour revenir après
      navigate('/login', {
        state: { 
          from: location.pathname,
          selectedRoom: {
            id: room.id,
            name: room.name,
            price: room.price,
            maxGuests: room.maxGuests
          }
        }
      });
      return;
    }

    // Si connecté, procéder à la réservation
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* En-tête avec nom et prix */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {room.name}
              </h1>
              <div className="flex flex-col items-end">
                <div className="text-3xl font-bold text-purple-600">
                  {room.price.toLocaleString('fr-FR')} FCFA
                </div>
                <div className="text-sm text-gray-500">par nuit</div>
              </div>
            </div>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl">
              {room.longDescription}
            </p>
          </div>

          {/* Galerie d'images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 sm:p-8">
            <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="grid grid-rows-2 gap-4 h-[400px] md:h-[500px]">
              {room.images.slice(1).map((image, index) => (
                <div key={index} className="rounded-2xl overflow-hidden">
                  <img
                    src={image}
                    alt={`${room.name} - Vue ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Caractéristiques principales */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <div className="text-center">
                <span className="block text-2xl mb-1">👥</span>
                <span className="text-sm text-gray-600">Capacité</span>
                <p className="font-semibold">{room.maxGuests} personnes</p>
              </div>
              <div className="text-center">
                <span className="block text-2xl mb-1">📏</span>
                <span className="text-sm text-gray-600">Superficie</span>
                <p className="font-semibold">{room.size}</p>
              </div>
              <div className="text-center">
                <span className="block text-2xl mb-1">⭐</span>
                <span className="text-sm text-gray-600">Note</span>
                <p className="font-semibold">{room.rating}/5</p>
              </div>
              <div className="text-center">
                <span className="block text-2xl mb-1">📝</span>
                <span className="text-sm text-gray-600">Avis</span>
                <p className="font-semibold">{room.reviews}</p>
              </div>
            </div>

            {/* Équipements */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="mr-2">✨</span> Équipements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton de réservation */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleReservation}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full font-medium text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Réserver maintenant</span>
                <span className="text-2xl">✨</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail; 