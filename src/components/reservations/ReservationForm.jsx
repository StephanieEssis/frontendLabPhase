import React, { useState } from 'react';

const ReservationForm = ({ categories = [] }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    checkInDate: '',
    checkOutDate: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nom requis';
    if (!form.email.trim()) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email invalide';
    if (!form.phone.trim()) newErrors.phone = 'Téléphone requis';
    if (!form.category) newErrors.category = 'Sélectionnez une catégorie';
    if (!form.checkInDate) newErrors.checkInDate = 'Date d’arrivée requise';
    if (!form.checkOutDate) newErrors.checkOutDate = 'Date de départ requise';
    else if (form.checkOutDate <= form.checkInDate) newErrors.checkOutDate = 'Date de départ doit être après la date d’arrivée';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    // Ici, appeler la fonction de réservation ou API
    alert('Réservation envoyée !');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
      <div>
        <label className="block mb-1 font-semibold">Nom complet</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Téléphone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Catégorie de chambre</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        >
          <option value="">-- Sélectionnez une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Date d’arrivée</label>
        <input
          type="date"
          name="checkInDate"
          value={form.checkInDate}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${errors.checkInDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        />
        {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Date de départ</label>
        <input
          type="date"
          name="checkOutDate"
          value={form.checkOutDate}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${errors.checkOutDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        />
        {errors.checkOutDate && <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
      >
        Réserver
      </button>
    </form>
  );
};

export default ReservationForm;
