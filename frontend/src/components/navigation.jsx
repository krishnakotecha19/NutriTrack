import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if userId exists in localStorage
    setIsUserLoggedIn(localStorage.getItem("user_id") !== null);
  }, []);

  if (!isUserLoggedIn) return null; // Hide navbar if user is not logged in

  return (
    <div className="navigation">
      <Link to="/home" className="nav-item">Home</Link>
      <Link to="/caloriein" className="nav-item">Calorie In</Link>
      <Link to="/trends" className="nav-item">Trends</Link>
      <Link to="/profile" className="nav-item">Profile</Link>
    </div>
  );
};

export default Navigation;
