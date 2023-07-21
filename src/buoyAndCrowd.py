from surfline.spot import Spot
from points import spots
from points import buoys
import os
from dotenv import load_dotenv
load_dotenv()

# Run Collect(True) to collect data locally. Run Collect(False) to collect data remotely.
class Collect:
    def __init__(self, local: str = 'local'):
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
            
    def run(self):
        self.addBuoyData()
        self.addCrowdData()

if __name__ == '__main__':
    Collect('vercel').run()
