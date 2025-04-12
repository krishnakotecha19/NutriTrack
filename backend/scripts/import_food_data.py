import pandas as pd
import mysql.connector

# Load the Anuvaad dataset
file_path = r"C:\Users\91758\Desktop\calorietrackerproject\scripts\Anuvaad_INDB_2024.11.xlsx"
  # Update this path
df = pd.read_excel(file_path, engine="openpyxl")

# Keep only required columns
df = df[["food_code", "food_name", "energy_kcal"]]
df.rename(columns={"food_code": "food_id", "energy_kcal": "calories_kcal"}, inplace=True)

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="calorietracker"
)
cursor = conn.cursor()

# Insert data into MySQL
for _, row in df.iterrows():
    cursor.execute("INSERT INTO food (food_id, food_name, calories_kcal) VALUES (%s, %s, %s)",
                   (row["food_id"], row["food_name"], row["calories_kcal"]))

conn.commit()
cursor.close()
conn.close()

print("Data inserted successfully!")

