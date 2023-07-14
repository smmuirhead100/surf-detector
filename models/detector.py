from roboflow import Roboflow
import os

# Roboflow is a Python client library for the Roboflow API. This is the configuration for the API.
rf = Roboflow(api_key="59JtXQpoU6dRc8UlfbXr")
project = rf.workspace().project("surfer-detector-3.0")
model = project.version(4).model

# Detects current crowd based on the current surf cam image available.
def detect():
    # infer on a local image
    print(os.getcwd())
    result = (model.predict("./assets/testpic.png", confidence=30, overlap=50).json())

    # visualize your prediction
    model.predict("./assets/testpic.png", confidence=30, overlap=50).save("./assets/predictionTest.jpg")
    
    # Predicted number of surfers in
    return len(result['predictions'])
    


# infer on a local image
# result = (model.predict("currSurf.png", confidence=30, overlap=50).json())

# Predicted number of surfers in the water
# print((len(result['predictions'])))

# visualize your prediction
# model.predict("cropped.png", confidence=30, overlap=50).save("prediction3.jpg")

# infer on an image hosted elsewhere
# print(model.predict("URL_OF_YOUR_IMAGE", hosted=True, confidence=40, overlap=30).json())