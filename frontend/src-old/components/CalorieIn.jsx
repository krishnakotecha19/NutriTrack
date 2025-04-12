import React, { useState, useEffect } from "react";
import "./styles.css";

const CalorieIn = () => {
  const [showCard, setShowCard] = useState(false);
  const [foodQuery, setFoodQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [customFood, setCustomFood] = useState({ name: "", calories: "" });
  const [totalCalories, setTotalCalories] = useState(0);

  const user_id = localStorage.getItem("user_id"); // ✅ Get the logged-in user ID

  useEffect(() => {
    console.log("Re-render triggered, Selected Foods:", selectedFoods);
  }, [selectedFoods]);

  // ✅ Function to fetch latest selected food
  const fetchLatestSelectedFood = async () => {
    if (!user_id) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/accounts/selected-food/history/?user_id=${user_id}`
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      if (!data.selected_foods || !Array.isArray(data.selected_foods)) {
        throw new Error("Invalid data format: selected_foods is missing or not an array");
      }

      console.log("🔄 Fetching latest selected foods:", data.selected_foods);
      const today = new Date().toISOString().split("T")[0];

      const todayFoods = data.selected_foods.filter(food => {
        const selectedDate = new Date(food.selected_at).toISOString().split("T")[0];
        return selectedDate === today;
      });

      setSelectedFoods(todayFoods);
    } catch (error) {
      console.error("❌ Error fetching selected food:", error);
    }
  };

  // ✅ Fetch previously selected food on page load
  useEffect(() => {
    fetchLatestSelectedFood();
  }, [user_id]); 

  // ✅ Fetch food items from the backend
  const fetchFoodList = async () => {
    if (!foodQuery) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/accounts/food/?search=${foodQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // ✅ Select food and immediately update the table
  const selectFood = async (foodItem) => {
    if (!user_id) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/selected-food/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user_id, 
          food_name: foodItem.food_name,
          calories_kcal: foodItem.calories_kcal,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const savedData = await response.json();
      console.log("✅ Selected food saved:", savedData);

      // 🔄 Fetch latest food items after adding
      fetchLatestSelectedFood();
    } catch (error) {
      console.error("❌ Error saving selected food:", error);
    }
  };

  // ✅ Handle custom food addition
  const addCustomFood = async () => {
    if (customFood.name && customFood.calories) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/accounts/add-custom-food/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user_id,
            food_name: customFood.name,
            calories_kcal: customFood.calories,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save food to database");
        }
        const savedFood = await response.json();
        console.log("✅ Food saved successfully:", savedFood);

        setCustomFood({ name: "", calories: "" });
        setShowCard(false);

        // 🔄 Fetch latest food items after adding
        fetchLatestSelectedFood();
      } catch (error) {
        console.error("❌ Error saving food:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Calorie-In</h2>
      <button className="main-button" onClick={() => setShowCard(true)}>
        Search/Add Food
      </button>
  
      {/* Food Search & Logging Card - moved above the table */}
      {showCard && (
        <div className="search-card">
          <h3>Log Food</h3>
          <input
            type="text"
            value={foodQuery}
            onChange={(e) => setFoodQuery(e.target.value)}
            placeholder="Search food..."
            className="search-input"
          />
          <button className="search-button" onClick={fetchFoodList}>Search</button>
          {results.length > 0 && (
            <div className="results-list">
              {results.map((item, index) => (
                <div key={index} className="result-item" onClick={() => selectFood(item)}>
                  <strong>{item.food_name}</strong> - {item.calories_kcal} kcal
                </div>
              ))}
            </div>
          )}
          <div className="custom-food-form">
            <h3>Add Custom Food</h3>
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
          <button className="close-button" onClick={() => setShowCard(false)}>Close</button>
        </div>
      )}
  
      {/* Selected Food History Table */}
      <div className="history">
        {selectedFoods && selectedFoods.length > 0 ? (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
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
                    <td>{food.id}</td>
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
