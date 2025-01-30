import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import Axios
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', {
        email,
        password,
      });

      console.log('Login response:', response.data);  // You can handle login success here
      alert('Login successful!');
    } catch (err) {
      console.error('Login error:', err.response);
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    }
    
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h4>Welcome to BalanceBites</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
