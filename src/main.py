import noaa.BuoyData as BuoyData
import schedule
import datetime
import time
from surfline.spot import Spot
from points import spots
from points import buoys
import os
from dotenv import load_dotenv
load_dotenv()

# Run Collect(True) to collect data locally. Run Collect(False) to collect data remotely.
class Collect:
    def __init__(self, local: bool = True):
        self.local = local
        self.spots = spots  # The spots to collect data for. Ex. Spot(common name, spotId, camName, nearestBuoyId)
        self.buoys = buoys # The buoys to collect data for. Ex. BuoyData.BuoyData(buoyId, spotName)
        self.key = os.getenv('SL_KEY')

    def addBuoyData(self):
        for buoy in self.buoys:
            buoy.addData(self.local)
            
    def addCrowdData(self):
        for spot in self.spots:
            spot.addCrowdData(self.local)

    def startCollecting(self):                              # Collects data every 10 minutes for crowd. Should only run between hours of 05:00 and 8:00.
        # for spot in self.spots:                             # Add Surfline data once a day for each spot. 
            # spot.addSurflineData(self.key, self.local)
        self.addBuoyData()
        self.addCrowdData()
        print('finished')
        schedule.every(30).minutes.do(self.addCrowdData)    # Add crowd data every 30 minutes.
        schedule.every(30).minutes.do(self.addBuoyData)     # Add buoy data every 30 minutes.
        
        while datetime.datetime.now().hour < 20:
            schedule.run_pending()
            time.sleep(1)
            
    def run(self):
        self.startCollecting()
        schedule.every().day.at('05:00').do(self.startCollecting) # Run every day starting at 5AM. 
        
        while True: 
            schedule.run_pending()
            time.sleep(1)

if __name__ == '__main__':
    Collect().run()
