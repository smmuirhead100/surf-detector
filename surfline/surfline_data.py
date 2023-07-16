import requests
from utilities.timestamp import unixToHuman




class SurflineData:
    def __init__(self, spotId: str):
        self.tides = self.getTides(spotId)
        self.waves = self.getWaves(spotId)
        self.wind = self.getWind(spotId)
        self.weather = self.getWeather(spotId)
        self.ratings = self.getRating(spotId)
    
    # Returns array of tuples (timestamp, height), with high tide and low tides for the next 3-4 days. 
    def getTides(self, spotId: str) -> list:

        res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/tides/?spotId=' + spotId)

        res = res.json()

        res = (res['data']['tides'])

        tides = []

        for tide in res:
            tides.append(tide)

        return tides

    # Returns array of dictionaries with wave data for the next 3-4 days.
    def getWaves(self, spotId: str) -> list:
        
        def removeSwells(wave: dict) -> dict:
            wave.pop('swells', None)
            return wave
        
        res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=' + spotId)

        res = res.json()

        res = (res['data']['wave'])
        
        res = removeSwells(res)

        waves = []

        for wave in res:
            waves.append(wave)

        return waves

    # Returns array of dictionaries with wind data for the next 3-4 days.
    def getWind(self,spotId: str) -> list:
        res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/wind?spotId=' + spotId)
        
        res = res.json()
        
        res = (res['data']['wind'])
        
        wind = []
        
        for w in res:
            wind.append(w)
            
        return wind

    # Returns array of dictionaries with weather data for the next 3-4 days.
    def getWeather(self, spotId: str) -> list:
        res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/weather?spotId=' + spotId)
        
        res = res.json()
        
        res = (res['data']['weather'])
        
        weather = []
        
        for w in res:
            weather.append(w)
            
        return weather
    
    # Returns ratings for the next 3-4 days.
    def getRating(self, spotId: str) -> int:
        res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/rating?spotId=' + spotId)
        
        res = res.json()
        
        res = (res['data']['rating'])
        
        ratings = []
        
        for r in res:
            ratings.append(r)
            
        return ratings