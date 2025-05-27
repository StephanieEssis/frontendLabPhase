import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation;

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Aucune réservation trouvée 😢
          </h2>
          <button
            onClick={() => navigate('/rooms')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Voir nos chambres
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-3xl p-8">
          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Réservation confirmée ! ✨
            </h2>
            <p className="text-gray-600">
              Merci d'avoir choisi MyLanLodge pour votre séjour
            </p>
          </div>

          {/* Détails de la réservation */}
          <div className="space-y-6">
            {/* Informations de la chambre */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Détails de la chambre</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Type de chambre</p>
                  <p className="font-medium">{reservation.roomDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Prix par nuit</p>
                  <p className="font-medium">{reservation.roomDetails.price.toLocaleString('fr-FR')} FCFA</p>
                </div>
              </div>
            </div>

            {/* Informations du client */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Informations du client</h3>
              <div>
                <p className="text-sm text-gray-600">Nom complet</p>
                <p className="font-medium">{reservation.fullName}</p>
              </div>
            </div>

            {/* Dates et invités */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Détails du séjour</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Arrivée</p>
                  <p className="font-medium">{formatDate(reservation.checkIn)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Départ</p>
                  <p className="font-medium">{formatDate(reservation.checkOut)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nombre de personnes</p>
                  <p className="font-medium">{reservation.guests} personne{reservation.guests > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Prix total */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">Prix total</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {reservation.totalPrice.toLocaleString('fr-FR')} FCFA
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Toutes taxes et frais de service inclus
              </p>
            </div>

            {/* Demandes spéciales */}
            {reservation.specialRequests && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">Demandes spéciales</h3>
                <p className="text-gray-600">{reservation.specialRequests}</p>
              </div>
            )}

            {/* Numéro de réservation */}
            <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Numéro de réservation</p>
              <p className="text-lg font-mono font-bold text-purple-600">{reservation.id}</p>
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handlePrint}
                className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-medium hover:bg-purple-50 transition-all duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimer la facture
              </button>
              <button
                onClick={() => navigate('/rooms')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Retour aux chambres
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation; 