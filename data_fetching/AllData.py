import requests
from data_fetching.Swell import getSwellData
from data_fetching.Weather import getWeatherData



# Get all weather and swell data for a given location. Location ID refers to the NOAA buoy ID. Location name refers to the name of the location (ex. Huntington Beach, CA)
# Ex. getAllData('46222', 'Huntington Beach')

def getAllData(locationID, locationName):
   
    # Retrieve data from different APIs
    swellData = getSwellData(locationID)
    weatherData = getWeatherData(locationName)
    
    # Return a dictionary with all data
    
    returnDict = {}
    
    returnDict['Swell'] = swellData
    returnDict['Weather'] = weatherData
    
    return returnDict
    