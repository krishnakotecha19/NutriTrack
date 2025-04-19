import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(0); 
  const [historyList, setHistoryList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_URL;

 
  const fetchCsrfToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/csrf/`, {
        credentials: "include",
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (err) {
      console.error("Error fetching CSRF token:", err);
    }
  };

  
  const fetchCalorieHistory = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        setError("User ID not found.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/accounts/get_calories/?user_id=${encodeURIComponent(userId)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log("📊 Today's Calories:", data);

      if (response.ok) {
        setHistory(data.total_calories || 0);
      } else {
        setError(data.error || "Failed to fetch calorie history.");
      }
    } catch (err) {
      console.error(" Error fetching today's history:", err);
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  
  const fetchFullHistory = async () => {
    const userId = localStorage.getItem("user_id");
    const response = await fetch(
      `${API_BASE_URL}/api/accounts/get_full_history/?user_id=${userId}`,
      { credentials: "include" }
    );
    const data = await response.json();

    
    const today = new Date().toISOString().split("T")[0];

    
    const filteredHistory = data.history.filter(
      (item) => item.date !== today
    );

    setHistoryList(filteredHistory);
    console.log("📆 Filtered Past History:", filteredHistory);
  };

 
  const updateCalorieHistory = async (calories) => {
    try {
      await fetchCsrfToken();
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        setError("User ID not found.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/accounts/update_calories/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({ user_id: userId, calories }),
        }
      );

      const data = await response.json();
      console.log(" Calories Updated:", data);

      if (response.ok) {
        setHistory(data.total_calories || 0);
      } else {
        setError(data.error || "Failed to update calories.");
      }
    } catch (err) {
      console.error(" Error updating calories:", err);
      setError("Something went wrong.");
    }
  };

  
  useEffect(() => {
    fetchCalorieHistory();
    fetchFullHistory();
  }, []);

  return (
    <div className="home-container">
      <h2>Home</h2>

      <button className="add-food-btn" onClick={() => navigate("/calorieIn")}>
        + Add Food
      </button>

      {loading ? (
        <p>Loading history...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="calorie-card">
          Today's Total Calorie Intake: <strong>{history} kcal</strong>
        </div>
      )}

      {historyList.length > 0 && (
        <div className="history-section">
          <div className="past-calorie-cards">
            {historyList.map((item, index) => (
              <div className="calorie-card past-card" key={index}>
                <div><strong>{item.date}</strong></div>
                <div>{item.total_calories} kcal</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
