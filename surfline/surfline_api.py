import requests



# Gets all Surfline Data for a particular spot.
class SurflineAPI:
    def __init__(self, spotId: str):
        self.tide = self.getTides(spotId)
        self.wave = self.getWaves(spotId)
        self.wind = self.getWind(spotId)
        self.weather = self.getWeather(spotId)
        self.rating = self.getRating(spotId)
    
    # Returns array of tuples (timestamp, height), with high tide and low tides for the next 3-4 days. 
    def getTides(self, spotId: str) -> list:

        res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/tides/?spotId=' + spotId)

        res = res.json()

        res = (res['data']['tides'])

        tides = []

        for tide in res:
            tide['spotId'] = spotId
            tides.append(tide)

        return tides

    # Returns array of dictionaries with wave data for the next 3-4 days.
    def getWaves(self, spotId: str) -> list:
        
        def removeSwells(wave: dict) -> dict:
            if 'swells' in wave:
                wave.pop('swells')
            return wave
        
        res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=' + spotId)

        res = res.json()

        res = (res['data']['wave'])

        waves = []

        for wave in res:
            removeSwells(wave)
            wave['spotId'] = spotId
            waves.append(wave)

        return waves

    # Returns array of dictionaries with wind data for the next 3-4 days.
    def getWind(self,spotId: str) -> list:
        res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/wind?spotId=' + spotId)
        
        res = res.json()
        
        res = (res['data']['wind'])
        
        wind = []
        
        for w in res:
            w['spotId'] = spotId
            wind.append(w)
            
        return wind

    # Returns array of dictionaries with weather data for the next 3-4 days.
    def getWeather(self, spotId: str) -> list:
        res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/weather?spotId=' + spotId)
        
        res = res.json()
        
        res = (res['data']['weather'])
        
        weather = []
        
        for w in res:
            w['spotId'] = spotId
            weather.append(w)
            
        return weather
    
    # Returns ratings for the next 3-4 days.
    def getRating(self, spotId: str) -> int:
        res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/rating?spotId=' + spotId)
        
        res = res.json()
        
        res = (res['data']['rating'])
        
        ratings = []
        
        for r in res:
            r['spotId'] = spotId
            ratings.append(r)
            
        return ratings