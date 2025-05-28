import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RoomDetail from './pages/RoomDetail';
import Rooms from './pages/Rooms';
import Reservation from './pages/Reservation';
import Confirmation from './pages/Confirmation';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route 
            path="/reservation" 
            element={
              <PrivateRoute>
                <Reservation />
              </PrivateRoute>
            } 
          />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute adminOnly={true}>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
