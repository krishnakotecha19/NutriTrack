import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError('');  // Clear error if passwords match

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/signup/', {
        username,
        email,
        password
      });

      // Handling successful response from the backend
      console.log('Signup response:', response.data);
      alert('User registered successfully!');
    } catch (err) {
      // Handling errors during signup
      if (err.response) {
        // If the error comes from the backend, log the error response
        console.error('Signup error:', err.response);
        setError(err.response?.data?.error || 'Failed to register. Please check your input.');
      } else {
        // If the error is not from the backend, log a general error message
        console.error('Error during signup:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h4>Welcome to BalanceBites</h4>
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />
      </div>
      <div className="input-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter your password"
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" className="signup-btn">Sign Up</button>
    </form>
  );
};

export default SignUp;
