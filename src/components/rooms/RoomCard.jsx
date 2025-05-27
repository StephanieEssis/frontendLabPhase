import React from 'react';

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col transform hover:scale-105">
      <img
        src={room.image}
        alt={room.name}
        className="rounded-xl h-48 sm:h-56 w-full object-cover mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
      <p className="text-sm text-gray-600 mt-1 mb-2">{room.description}</p>

      <div className="flex justify-between items-center mt-auto">
        <span className="text-blue-600 font-bold text-md">{room.price} FCFA / nuit</span>
        <button
          aria-label={`Réserver la chambre ${room.name}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Réserver
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
