import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-8">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MylanLodge. Tous droits réservés.
      </p>
    </footer>
  );
};

export { Footer as default };
