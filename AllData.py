import requests
from Swell import getSwellData
from Weather import getWeatherData



# Get all weather data for a given location. Location ID refers to the NOAA buoy ID. Location name refers to the name of the location (ex. Huntington Beach, CA)

def getAllData(locationID, locationName):
   
    # Retrieve data from different APIs
    swellData = getSwellData(locationID)
    weatherData = getWeatherData(locationName)
    
    # Return a dictionary with all data
    
    returnDict = {}
    
    returnDict['Swell'] = swellData
    returnDict['Weather'] = weatherData
    
    return returnDict
    