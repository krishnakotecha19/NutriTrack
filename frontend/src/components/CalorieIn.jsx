import React, { useState, useEffect } from "react";
import "./styles.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const CalorieIn = () => {
  const [foodQuery, setFoodQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [customFood, setCustomFood] = useState({ name: "", calories: "" });
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    console.log("Re-render triggered, Selected Foods:", selectedFoods);
  }, [selectedFoods]);
  useEffect(() => {
    fetchLatestSelectedFood();
  }, []);
  
  const fetchLatestSelectedFood = async () => {
    if (!user_id) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/accounts/selected-food/history/?user_id=${user_id}`
      );
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      const today = new Date().toISOString().split("T")[0];
      const todayFoods = data.selected_foods.filter(food => {
        const selectedDate = new Date(food.selected_at).toISOString().split("T")[0];
        return selectedDate === today;
      });

      setSelectedFoods(todayFoods);
    } catch (error) {
      console.error(" Error fetching selected food:", error);
    }
  };

  const fetchFoodList = async (query = "") => {
    if (!query) return; // prevent fetching default 8

    try {
      const url = `${API_BASE_URL}/api/accounts/food/?search=${query}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      setResults(data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const selectFood = async (foodItem) => {
    if (!user_id) return;
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/selected-food/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          food_name: foodItem.food_name,
          calories_kcal: foodItem.calories_kcal,
        }),
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const savedData = await response.json();
      console.log(" Selected food saved:", savedData);
  
      fetchLatestSelectedFood();
      setShowSearchCard(false); // Close the search card
    } catch (error) {
      console.error(" Error saving selected food:", error);
    }
  };
  

  const addCustomFood = async () => {
    if (customFood.name && customFood.calories) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/accounts/add-custom-food/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id,
            food_name: customFood.name,
            calories_kcal: customFood.calories,
          }),
        });

        if (!response.ok) throw new Error("Failed to save food to database");

        const savedFood = await response.json();
        console.log(" Food saved successfully:", savedFood);

        setCustomFood({ name: "", calories: "" });
        setShowCustomForm(false);
        fetchLatestSelectedFood();
      } catch (error) {
        console.error(" Error saving food:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginLeft: "10px" }}>Calorie-In</h2>


      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button
          className="main-button"
          onClick={() => {
            setShowSearchCard(true);
            setShowCustomForm(false);
            setResults([]); // Clear previous search results
            setFoodQuery("");
          }}
        >
          Search Food
        </button>

        <button
          className="main-button"
          onClick={() => {
            setShowCustomForm(true);
            setShowSearchCard(false);
          }}
        >
          Add Custom Food
        </button>
      </div>

      {showSearchCard && (
  <div className="full-screen-drawer">
    <div className="drawer-content">
      <input
        type="text"
        value={foodQuery}
        onChange={(e) => setFoodQuery(e.target.value)}
        placeholder="Search food..."
        className="search-input"
      />
      <button className="search-button" onClick={() => fetchFoodList(foodQuery)}>Search</button>

      <div className="results-list">
        {results.map((item, index) => (
          <div key={index} className="result-item" onClick={() => selectFood(item)}>
            <strong>{item.food_name}</strong> - {item.calories_kcal} kcal
          </div>
        ))}
      </div>
    </div>
    <button className="close-button" onClick={() => setShowSearchCard(false)}>
      Let's go back!
    </button>
  </div>
)}
{showSearchCard && (
  <div className="full-screen-drawer">
    <div className="drawer-content">
      <h2 className="drawer-heading">Let's add food </h2>

      <input
        type="text"
        value={foodQuery}
        onChange={(e) => setFoodQuery(e.target.value)}
        placeholder="Search food..."
        className="search-input"
      />
      <button className="search-button" onClick={() => fetchFoodList(foodQuery)}>Search</button>

      <div className="results-list">
        {results.map((item, index) => (
          <div key={index} className="result-item" onClick={() => selectFood(item)}>
            <strong>{item.food_name}</strong> - {item.calories_kcal} kcal
          </div>
        ))}
      </div>
    </div>
    <button className="close-button" onClick={() => setShowSearchCard(false)}>
      Let's go back!
    </button>
  </div>
)}

{showCustomForm && (
  <div className="full-screen-drawer">
    <div className="drawer-content">
      <h2 className="drawer-heading">Add Custom Food!</h2>

      <input
        type="text"
        placeholder="Food Name"
        value={customFood.name}
        onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
        className="custom-input"
      />
      <input
        type="number"
        placeholder="Calories"
        value={customFood.calories}
        onChange={(e) => setCustomFood({ ...customFood, calories: e.target.value })}
        className="custom-input"
      />
      <button className="add-button" onClick={addCustomFood}>Add</button>
    </div>
    <button className="close-button" onClick={() => setShowCustomForm(false)}>
      Let's go back!
    </button>
  </div>
)}

      <div className="history">
        {selectedFoods && selectedFoods.length > 0 ? (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Calories (kcal)</th>
                <th>Selected At</th>
              </tr>
            </thead>
            <tbody>
              {selectedFoods
                .filter((food) => food.food_name && food.calories_kcal && food.selected_at)
                .map((food) => (
                  <tr key={food.id}>
                    <td>{food.food_name}</td>
                    <td>{food.calories_kcal.toFixed(2)}</td>
                    <td>{new Date(food.selected_at).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No food selected yet.</p>
        )}
      </div>
    </div>
  );
};

export default CalorieIn;
