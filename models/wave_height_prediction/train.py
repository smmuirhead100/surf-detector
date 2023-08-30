import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import sys, os
import joblib
sys.path.append('../../data/src/db')
from db_methods import Database


# -------------- Data Setup Portion --------------- #
db = Database('local')
data = []

conditions_data = db.getTable('historical_surf.surf_conditions')

print('Initializing Data Parsing. This may take a couple minutes.')
for condition in conditions_data:
    current_data_point = []
    minHeight = condition[8]
    maxHeight = condition[9]
    current_data_point.extend((minHeight, maxHeight))
    swell_data = db.getTable('historical_surf.swells', '*', [f"timestamp = {condition[0]}"])        # Gets swells from the swell table of corresponding timestamp.
    for swell in swell_data:
        height = swell[1]
        period = swell[2]
        direction = swell[5]
        current_data_point.extend((height, period, direction))
    while len(current_data_point) < 20:         # Fill in missing swell with 0's
        current_data_point.append(0)
    if len(current_data_point) != 20:           # Every element should have a length of 20
        print('Data point not valid length')
        break; 
    else: 
        data.append(current_data_point)


# -------------- Training Portion ------------------- #
print("Training Model! This will take a while as well.")

# Separate features (swell attributes) and targets (min and max heights)
X = np.array([item[2:] for item in data])  # Features: height, period, direction
y_min = np.array([item[0] for item in data])  # Minimum height
y_max = np.array([item[1] for item in data])  # Maximum height

# Split the dataset into training and testing sets
X_train, X_test, y_min_train, y_min_test, y_max_train, y_max_test = train_test_split(
    X, y_min, y_max, test_size=0.01, random_state=42
)

# Create a linear regression model for minimum height
min_height_model = LinearRegression()
min_height_model.fit(X_train, y_min_train)

# Create a linear regression model for maximum height
max_height_model = LinearRegression()
max_height_model.fit(X_train, y_max_train)

# Predict minimum and maximum heights using the models
y_min_pred = min_height_model.predict(X_test)
y_max_pred = max_height_model.predict(X_test)

# Save the trained models using joblib
joblib.dump(min_height_model, 'min_height_model.joblib')
joblib.dump(max_height_model, 'max_height_model.joblib')

# Print predicted and actual values for comparison
for i in range(len(y_min_test)):
    print(f"Sample {i+1}:")
    print(f"Predicted Min Height: {y_min_pred[i]}, Actual Min Height: {y_min_test[i]}")
    print(f"Predicted Max Height: {y_max_pred[i]}, Actual Max Height: {y_max_test[i]}")
    print("-" * 30)