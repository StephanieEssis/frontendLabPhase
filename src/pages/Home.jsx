import React, { useEffect, useState } from 'react';
import RoomList from '../components/rooms/RoomList';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);

  useEffect(() => {
    // Données mockées –à remplacer par un fetch API plus tard
    setFeaturedRooms([
      {
        id: 1,
        name: 'Suite Royale',
        description: 'Un luxe inégalé avec jacuzzi et vue panoramique.',
        price: 80000,
        image: '/images/royal2.avif',
      },
      {
        id: 2,
        name: 'Chambre Évasion',
        description: 'Un cocon paisible au cœur de la nature.',
        price: 75000,
        image: './images/stand2.png',
      },
      {
        id: 3,
        name: 'Chambre Éco Chic',
        description: 'Confort et durabilité à petit prix.',
        price: 50000,
        image: './images/vuebaie.jpeg',
      },
    ]);
  }, []);

  return (
    <div className="space-y-16 bg-gradient-to-b from-pink-50 to-blue-50 min-h-screen">
      {/* Hero Section avec animation */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-gradient-x"></div>
        <div className="relative bg-cover bg-center bg-no-repeat text-white py-32 px-6 rounded-b-[60px] shadow-lg"
          style={{ backgroundImage: 'url(/images/hero.jpg)' }}
        >
          <div className="max-w-3xl mx-auto text-center bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Bienvenue à MylanLodge
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-700">
              Un séjour magique vous attend dans notre oasis de bonheur et de confort ✨
            </p>
            <Link
              to="/rooms"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Découvrir nos chambres ✨
            </Link>
          </div>
        </div>
      </section>

      {/* Section présentation avec des cartes animées */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Une Expérience Unique ✨
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Confort Royal</h3>
              <p className="text-gray-600">Des chambres somptueuses pour un séjour inoubliable.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🌺</div>
              <h3 className="text-xl font-semibold mb-2 text-pink-600">Ambiance Féerique</h3>
              <p className="text-gray-600">Une décoration enchantée qui émerveille les sens.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Design Unique</h3>
              <p className="text-gray-600">Chaque espace est pensé pour votre bien-être.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms avec animation */}
      <section className="py-16 px-4 bg-white/80 backdrop-blur-sm rounded-t-[60px] shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Nos Chambres Coup de Cœur 💖
          </h2>
          <RoomList rooms={featuredRooms} />
          <div className="text-center mt-12">
            <Link
              to="/rooms"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Voir toutes nos chambres ✨
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Home as default };
