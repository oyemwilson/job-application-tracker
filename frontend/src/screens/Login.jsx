import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import api from '../services/api';
import axios from 'axios'; 

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://job-application-tracker-aazk.onrender.com//api/auth/login', { email, password });
      console.log(res.data); // Log the response data
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        setError(err.response.data.msg || 'An error occurred');
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from the server');
      } else {
        // Something happened in setting up the request
        setError(err.message || 'An error occurred');
      }
    }
  };


  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Login</button>


<h3 className='mt-3 text-center'>
  Do not have an account?  
  <Link to="/register" className='btn btn-primary'>Sign up</Link>
</h3>

      </form>
    </div>
  );
}

export default Login;