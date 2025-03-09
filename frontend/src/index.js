import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Landiingpage from './screens/Landingpage';
import Login from './screens/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';

// function Application() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//   };

// root.render(
//   <Router>
//     <Routes>
//       <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/dashboard" element={isLoggedIn ? <Dashboard logout={logout} /> : <Navigate to="/login" />} />
//       <Route path="/landingpage" element={<Landiingpage />} />
//       <Route path="/" element={isLoggedIn ? <Dashboard logout={logout} /> : <Navigate to="/login" />} />

//     </Routes>
//   </Router>
// );
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
