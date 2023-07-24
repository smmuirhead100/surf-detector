from roboflow import Roboflow

rf = Roboflow(api_key="59JtXQpoU6dRc8UlfbXr")
project = rf.worcxkspace("sean-muirhead-xtg4l").project("surfer-detector-3.0")
dataset = project.version(7).download("yolov8")
