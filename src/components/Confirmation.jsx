import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const reservationData = location.state?.reservationData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Réservation Confirmée !
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Merci d'avoir choisi MylanLodge pour votre séjour.
            </p>
          </div>

          {reservationData && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Détails de votre réservation
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Dates</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    Du {new Date(reservationData.startDate).toLocaleDateString()} au{' '}
                    {new Date(reservationData.endDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Nombre de personnes
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {reservationData.guests} personne(s)
                  </dd>
                </div>
                {reservationData.roomType && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Type de chambre
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {reservationData.roomType}
                    </dd>
                  </div>
                )}
                {reservationData.specialRequests && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Demandes spéciales
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {reservationData.specialRequests}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <p className="text-sm text-gray-500">
              Un email de confirmation a été envoyé à votre adresse.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform transition-all duration-200 hover:scale-105"
              >
                Retour à l'accueil
              </Link>
              <Link
                to="/rooms"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 transform transition-all duration-200 hover:scale-105"
              >
                Voir d'autres chambres
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation; 