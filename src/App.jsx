import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/Home';
import CalorieIn from './components/CalorieIn';
import Trends from './components/Trends';
import Profile from './components/Profile';
import Navigation from './components/navigation';

// ProtectedRoute component to handle redirects when not logged in
const ProtectedRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? (
    <>
      <Navigation />  {/* Show navigation only in protected routes */}
      {element}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const user = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(user);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes with Navigation inside */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} isLoggedIn={isLoggedIn} />} />
        <Route path="/calorieIn" element={<ProtectedRoute element={<CalorieIn />} isLoggedIn={isLoggedIn} />} />
        <Route path="/trends" element={<ProtectedRoute element={<Trends />} isLoggedIn={isLoggedIn} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
