import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Reservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRoom = location.state?.selectedRoom;
  const token = localStorage.getItem('token');

  // Rediriger vers login si non connecté
  useEffect(() => {
    if (!token) {
      navigate('/login', { 
        state: { 
          from: location.pathname,
          selectedRoom: selectedRoom
        }
      });
    }
  }, [token, navigate, location.pathname, selectedRoom]);

  const [formData, setFormData] = useState({
    fullName: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: selectedRoom?.id || '',
    specialRequests: ''
  });

  // Données statiques pour la démo
  const roomTypes = [
    { id: 'suite', name: 'Suite Royal', price: 80000, maxGuests: 2 },
    { id: 'deluxe', name: 'Chambre Deluxe', price: 75000, maxGuests: 2 },
    { id: 'eco', name: 'Eco Chic', price: 50000, maxGuests: 2 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculer le prix total
    const totalPrice = calculateTotalPrice();
    
    // Simuler une réservation réussie
    const mockReservation = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'confirmée',
      totalPrice: totalPrice,
      roomDetails: selectedRoom || roomTypes.find(r => r.id === formData.roomType)
    };

    // Stocker la réservation dans localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations.push(mockReservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    // Rediriger vers la page de confirmation
    navigate('/confirmation', { 
      state: { reservation: mockReservation }
    });
  };

  const calculateTotalPrice = () => {
    const room = selectedRoom || roomTypes.find(r => r.id === formData.roomType);
    if (!room || !formData.checkIn || !formData.checkOut) return 0;

    try {
      const checkIn = new Date(formData.checkIn).getTime();
      const checkOut = new Date(formData.checkOut).getTime();
      
      if (isNaN(checkIn) || isNaN(checkOut)) return 0;
      
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const nights = Math.max(1, Math.ceil((checkOut - checkIn) / millisecondsPerDay));
      
      return room.price * nights;
    } catch (error) {
      console.error('Erreur lors du calcul du prix:', error);
      return 0;
    }
  };

  // Obtenir la date minimum (aujourd'hui) pour le check-in
  const today = new Date().toISOString().split('T')[0];
  
  // Obtenir la date minimum pour le check-out (jour après le check-in)
  const minCheckOut = formData.checkIn || today;

  if (!token) {
    return null; // Le useEffect s'occupera de la redirection
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {selectedRoom ? `Réserver ${selectedRoom.name} ✨` : 'Nouvelle Réservation ✨'}
            </h2>
            <p className="text-gray-600">
              Remplissez le formulaire ci-dessous pour effectuer votre réservation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom complet */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Entrez votre nom complet"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Sélection de la chambre si non présélectionnée */}
            {!selectedRoom && (
              <div>
                <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                  Type de chambre
                </label>
                <select
                  id="roomType"
                  name="roomType"
                  required
                  value={formData.roomType}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Sélectionnez une chambre</option>
                  {roomTypes.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.name} - {room.price.toLocaleString('fr-FR')} FCFA/nuit
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Dates de séjour */}
              <div>
                <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                  Date d'arrivée
                </label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  required
                  min={today}
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                  Date de départ
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  required
                  min={minCheckOut}
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Nombre de personnes */}
            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                Nombre de personnes
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                {[...Array(selectedRoom?.maxGuests || 2)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} personne{i > 0 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Demandes spéciales */}
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
                Demandes spéciales
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                rows={3}
                value={formData.specialRequests}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Exemple : Lit bébé, étage préféré, etc."
              />
            </div>

            {/* Prix total estimé */}
            {formData.checkIn && formData.checkOut && (formData.roomType || selectedRoom) && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Prix total estimé</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {calculateTotalPrice().toLocaleString('fr-FR')} FCFA
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Ce prix inclut toutes les taxes et frais de service
                </p>
              </div>
            )}

            {/* Bouton de soumission */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Confirmer la réservation ✨
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
