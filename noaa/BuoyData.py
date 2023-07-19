import sys
import time

sys.path.append('../')

from noaa.Swell import getSwellData
from noaa.Weather import getWeatherData



# Get all weather and swell data for a given location. Location ID refers to the NOAA buoy ID. Location name refers to the name of the location (ex. Huntington Beach, CA)
# Ex. getAllData('46222', 'Huntington Beach')

def getAllData(buoyId, spotName):
   
    # Retrieve data from different APIs
    swellData = getSwellData(buoyId)
    weatherData = getWeatherData(spotName)
    
    # Return a dictionary with all data
    
    returnDict = {}
    
    returnDict['timestamp'] = time.time()
    returnDict['buoyID'] = buoyId
    returnDict['spotName'] = spotName
    returnDict['Swell'] = swellData
    returnDict['Weather'] = weatherData
    
    return returnDict