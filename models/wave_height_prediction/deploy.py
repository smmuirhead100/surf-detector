import joblib

# Load the trained models from the files
loaded_min_height_model = joblib.load('min_height_model.joblib')
loaded_max_height_model = joblib.load('max_height_model.joblib')

# Now you can use these loaded models to make predictions
def predict_heights(features):
    min_height = loaded_min_height_model.predict([features])[0]
    max_height = loaded_max_height_model.predict([features])[0]
    return min_height, max_height

# Example usage
sample_features = [1.56, 6.9, 270, 1.4, 9.8, 180, .8, 12.6, 181, 0, 0, 0, 0, 0, 0, 0, 0, 0] # Replace with your actual feature values
predicted_min_height, predicted_max_height = predict_heights(sample_features)
print(f"Predicted Min Height: {predicted_min_height}")
print(f"Predicted Max Height: {predicted_max_height}")