import sys
sys.path.append('../')
from noaa.BuoyData import getAllData

class Buoy():
    def __init__(self, buoyId: str, spotName: str):
        self.buoyId = buoyId
        self.spotName = spotName
        self.data = self.getData()
        
    def getData(self):
        from noaa.BuoyData import getAllData
        return getAllData(self.buoyId, self.spotName)