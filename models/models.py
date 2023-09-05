from typing import List

class PredictionModel:
    def __init__(self):
        pass
    def predict():
        raise NotImplementedError
    
class WavePredictionModel(PredictionModel):
    def __init__(self, min_prediction_model, max_prediction_model):
        super()
        self.min_prediction_model = min_prediction_model
        self.max_prediction_model = max_prediction_model
    def predict(self, swell: List[float]):
        min_value = self.min_prediction_model.predict([swell])[0]
        max_value = self.max_prediction_model.predict([swell])[0]
        return {"min": min_value, "max": max_value}