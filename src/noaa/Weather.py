import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()

# Gets all weather data from a particular location such as temperature, wind speed, etc.

key = os.environ.get('WEATHER_API_KEY')

def getWeatherData(location):
    # Obtain weather data from the Weather API. 
    url = "http://api.weatherapi.com/v1/current.json?key=" + key + "&q=" + location +"&aqi=no"
    response = requests.get(url)
    
    if response.status_code == 200:
        
        # Process the response data
        data = response.content
        data = json.loads(data)

        # Add to the return dictionary
        returnDict = {}
        returnDict['temp'] = data['current']['temp_f']
        returnDict['wind'] = data['current']['wind_mph']
        returnDict['windDir'] = data['current']['wind_dir']
        returnDict['precip'] = data['current']['precip_in']
        returnDict['currCloud'] = data['current']['cloud']
        
        return returnDict
    
    else:
        # Return an error message
        print('Error: Failed to retrieve data from the Weather API.', status=response.status_code)
