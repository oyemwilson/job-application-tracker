import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
// import api from '../services/api';

function Register({ setIsLoggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');
const navigate = useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5001/api/auth/register', { name, email, password, skills });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      navigate('/');
      console.log(res)
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Skills (comma-separated)</label>
          <input type="text" className="form-control" value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Register</button>
      </form>
    </div>
  );
}

export default Register;