import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    setIsUserLoggedIn(localStorage.getItem("user_id") !== null);
  }, []);

  if (!isUserLoggedIn) return null;

  return (
    <div className="navigation">
      <Link to="/home" className="nav-item">
        <img src={`${process.env.PUBLIC_URL}/home.png`} alt="Home" className="nav-icon" />
       
      </Link>
      <Link to="/caloriein" className="nav-item">
        <img src={`${process.env.PUBLIC_URL}/feast.png`} alt="Calorie In" className="nav-icon" />
     
      </Link>
      <Link to="/trends" className="nav-item">
        <img src={`${process.env.PUBLIC_URL}/trends.png`} alt="Trends" className="nav-icon" />
       
      </Link>
      <Link to="/profile" className="nav-item">
        <img src={`${process.env.PUBLIC_URL}/profile.png`} alt="Profile" className="nav-icon" />
       
      </Link>
    </div>
  );
};

export default Navigation;
