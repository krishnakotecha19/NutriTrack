import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const fetchCSRFToken = async () => {
    console.log("📡 Fetching CSRF Token...");
    
    try {
        const csrfResponse = await fetch(`${API_BASE_URL}/api/accounts/csrf/`, {
            method: "GET",
            credentials: "include",
        });

        if (!csrfResponse.ok) {
            throw new Error("Failed to fetch CSRF token");
        }

        const csrfData = await csrfResponse.json();
        console.log(" CSRF Token Received:", csrfData.csrfToken);

        return csrfData.csrfToken || null;
    } catch (error) {
        console.error(" CSRF Token Fetch Error:", error);
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const csrfToken = await fetchCSRFToken();

        console.log("Sending Login Request");

        const response = await fetch(`${API_BASE_URL}/api/accounts/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();
        console.log(" Response Data:", data);

        if (response.ok) {
            console.log(" Login successful", data);
            localStorage.setItem("user_id", data.user_id);
            setIsLoggedIn(true);
            navigate("/home");
        } else {
            console.error(" Login Error:", data);
            setError(data.error || "Invalid credentials");
        }
    } catch (error) {
        console.error(" Network Error:", error);
        setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h4>Welcome to feastify</h4>
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
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
