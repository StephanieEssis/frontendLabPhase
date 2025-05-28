import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-50 to-emerald-50 text-center py-6 mt-8 border-t border-green-100">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} MylanLodge. Tous droits réservés.
      </p>
    </footer>
  );
};

export { Footer as default };
