from roboflow import Roboflow
rf = Roboflow(api_key="59JtXQpoU6dRc8UlfbXr")
project = rf.workspace().project("surfer-detector-3.0")
model = project.version(4).model

# infer on a local image
result = (model.predict("testpic.png", confidence=30, overlap=50).json())

# Predicted number of surfers in the water
print((len(result['predictions'])))

# visualize your prediction
model.predict("testpic.png", confidence=30, overlap=50).save("prediction4.jpg")

# infer on an image hosted elsewhere
# print(model.predict("URL_OF_YOUR_IMAGE", hosted=True, confidence=40, overlap=30).json())