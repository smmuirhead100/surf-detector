import sys
import time
import schedule
import datetime

# Add path to surfline package
sys.path.append('../../../')

# Import models and surfline package
from models.surfer_detection.detector import detect
from surfline.surfline_data import SurflineData
from surfline.spot import Spot
from db.db_methods import Database
from db.schema.db_schema_01 import SurflineConfig
from surfline.utilities.cam_screenshot import screenshotCam
from noaa.AllData import getAllData

# ----------------- Add data to database ----------------- #
# 1. Clear and configure database
# 2. Get Surfline data
# 3. Get crowd data
# 4. Add data to database

malibu = Spot('Malibu', '584204214e65fad6a7709b9f', 'malibuclose', '46222')

def addMalibuSurfData():
    db = Database('local') # Using local database for now
    
    # Helper function to insert data into database  
    def insertData(data: dict, table: str):
        for row in data:
            db.insert(table, row)
        
    # Make sure tables are configured
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

    # Add curr noaa data to database
    result = getAllData(buoyID, spotName)
    result['buoyID'] = buoyID
    result['spotName'] = spotName
    result['timestamp'] = int(time.time())
    db.insert('noaaData', result)
    db.close()

# Starts collecting data every 20 seconds. Should only run between hours of 05:00 and 7:00.
def startCollecting(): 
    addMalibuSurfData()
    schedule.every(1).minute.do(addMalibuCrowdData)
    
    while datetime.datetime.now().hour < 19:
        schedule.run_pending()
        time.sleep(1)


# Runs all the time, collecting data.
def main():
    startCollecting()
    schedule.every().day.at('05:00').do(startCollecting)
    
    while True: 
       schedule.run_pending()
       time.sleep(1)

main()
