import sys
import time

# Add path to surfline package
sys.path.append('../../../')

# Import models and surfline package
from models.surfer_detection.detector import detect
from surfline.surfline_data import SurflineData
from db.db_methods import Database
from db.db_config import SurflineConfig
from surfline.utilities.cam_screenshot import screenshotCam
from noaa.AllData import getAllData

buoyID = '46222'
spotName = 'Malibu'
# ----------------- Add data to database ----------------- #
# 1. Clear and configure database
# 2. Get Surfline data
# 3. Get crowd data
# 4. Add data to database

def addMalibuSurfData():
    db = Database('local') # Using local database for now
    
    # Helper function to insert data into database  
    def insertData(data: dict, table: str):
        for row in data:
            db.insert(table, row)
        
    # MAke sure tables are configured
    config = SurflineConfig(db)
    config.addTables()
    
    # Data object
    data = SurflineData('584204214e65fad6a7709b9f') # SpotId corresponsing to Malibu First Point
    
    # Inserting all the data
    insertData(data.tide, 'tide')
    insertData(data.wave, 'wave')
    insertData(data.wind, 'wind')
    insertData(data.weather, 'weather')
    insertData(data.rating, 'rating')
    
    db.close()
    
def addMalibuCrowdData():
    db = Database('local') # Using local database for now
    
    # Need to make sure an instance of the surfline cam is running on desktop for Malibu.
    currCamPath = screenshotCam('malibu')
    currCrowd = detect(currCamPath)
    db.insert('crowd', {'timestamp': int(time.time()), 'crowd': currCrowd, 'spotId': '584204214e65fad6a7709b9f'})
    db.close()

    # Obtain Result Object 
    result = getAllData(buoyID, spotName)
    result['locationID'] = buoyID
    result['Name'] = spotName
    print(result)

addMalibuCrowdData()
# addMalibuSurfData()

