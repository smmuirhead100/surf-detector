from roboflow import Roboflow
rf = Roboflow(api_key="59JtXQpoU6dRc8UlfbXr")
project = rf.workspace().project("surfer-detector-3.0")
model = project.version(4).model

def detect():
    # infer on a local image
    result = (model.predict("cropped.png", confidence=30, overlap=50).json())

    # visualize your prediction
    model.predict("cropped.png", confidence=30, overlap=50).save("prediction3.jpg")
    
    # Predicted number of surfers in
    return len(result['predictions'])
    


# infer on a local image
result = (model.predict("cropped.png", confidence=30, overlap=50).json())

# Predicted number of surfers in the water
print((len(result['predictions'])))

# visualize your prediction
model.predict("cropped.png", confidence=30, overlap=50).save("prediction3.jpg")

# infer on an image hosted elsewhere
# print(model.predict("URL_OF_YOUR_IMAGE", hosted=True, confidence=40, overlap=30).json())