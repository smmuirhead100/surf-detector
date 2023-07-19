import sys
import time

sys.path.append('../')

from noaa.Swell import getSwellData
from noaa.Weather import getWeatherData



# Get all weather and swell data for a given location. Location ID refers to the NOAA buoy ID. Location name refers to the name of the location (ex. Huntington Beach, CA)
# Ex. getAllData('46222', 'Huntington Beach')

def getAllData(locationID, locationName):
   
    # Retrieve data from different APIs
    swellData = getSwellData(locationID)
    weatherData = getWeatherData(locationName)
    
    # Return a dictionary with all data
    
    returnDict = {}
    
    returnDict['time'] = time.time()
    returnDict['Swell'] = swellData
    returnDict['Weather'] = weatherData
    
    return returnDict

print(getAllData('46244', 'New York'))