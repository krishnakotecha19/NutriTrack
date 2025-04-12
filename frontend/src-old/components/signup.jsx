import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents form from refreshing

    if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
    }

    setError(""); // Clear previous errors

    const requestData = { username, email, password };

    console.log("🚀 Sending data:", requestData);

    try {
        const response = await fetch("http://127.0.0.1:8000/api/accounts/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        console.log("📝 Signup Response:", data);

        if (response.ok) {
            navigate("/login"); // Redirect to login page after successful signup
        } else {
            setError(data.error || "Signup failed. Please try again.");
        }
    } catch (error) {
        console.error("❌ Error during signup:", error);
        setError("Something went wrong. Please try again.");
    }
};

  

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <h4>Welcome to forkit</h4>
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
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
          placeholder="Create a password"
          required
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
          required
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" className="signup-btn">Sign Up</button>
    </form>
  );
};

export default SignUp;
