import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    console.log("Stored user_id:", userId); // Debugging

    if (userId) {
      fetch(`http://127.0.0.1:8000/api/accounts/user/?user_id=${userId}`)
        .then((response) => {
          console.log("API Response Status:", response.status);
          return response.json();
        })
        .then((data) => {
          console.log("Fetched User Data:", data); // Debugging
          if (data.username && data.email) {
            setUser(data);
          } else {
            console.error("User not found in API response");
          }
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear(); // Clear user session
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
  
      <div className="profile-card">
        <p><strong>Username:</strong> {user.username || "Loading..."}</p>
        <p><strong>Email:</strong> {user.email || "Loading..."}</p>
      </div>
  
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};


export default Profile;  