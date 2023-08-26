import requests
from datetime import datetime, timedelta

class TideStation(): 
    
    def __init__(self, stationId):
        self.BASE_URL = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter"
        self.stationId = stationId
        self.begin_date = datetime.now().date()
        self.end_date = self.begin_date + timedelta(days=20)
        
    def fetch_tide_data(self):
        
        # Parameters for the API request
        params = {
            "product": "predictions",
            "application": "NOS.COOPS.TAC.WL",
            "begin_date": self.begin_date.strftime('%Y%m%d'),
            "end_date": self.end_date.strftime('%Y%m%d'),
            "datum": "MLLW",
            "station": (self.stationId),
            "time_zone": "lst_ldt",
            "units": "english",
            "interval": "30",   # Clustered in 30 minute intervals.
            "format": "json"
        }
        
        response = requests.get(self.BASE_URL, params=params)

        # Check if the request was successful
        if response.status_code == 200:
            data = response.json()
            return data
        
        else:
            return False