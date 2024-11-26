import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/SignIn.css'; 

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // Store token and role in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role); // assuming the role is returned from the API
      
      setMessage('Login successful');

      // Redirect user based on role
      if (res.data.role === 'Host') {
        navigate('/hostdashboard'); // Redirect to Host Dashboard if role is Host
      } else {
        navigate('/profile'); // Redirect to homepage or Guest dashboard
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <h2 className="signin-title">Sign In</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        className="signin-input"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
        className="signin-input"
        required
      />
      <button type="submit" className="signin-button">Sign In</button>
      <p className="signin-message">{message}</p>
      <Link to="/signup" className="signup-link">Don't have an account? Sign Up</Link>
    </form>
  );
};

export default SignIn;
