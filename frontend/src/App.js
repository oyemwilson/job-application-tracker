import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Landingpage from './screens/Landingpage';
import Login from './screens/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsLoggedIn(false); // Update the login state
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard logout={logout} /> : <Navigate to="/login" />} />
        <Route path="/landingpage" element={<Landingpage />} />
        <Route path="/" element={isLoggedIn ? <Dashboard logout={logout} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}


export default App;
