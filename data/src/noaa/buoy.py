import sys
sys.path.append('../')
from noaa.BuoyData import getAllData
from db.db_methods import Database

class Buoy():
    def __init__(self, buoyId: str, spotName: str):
        self.buoyId = buoyId
        self.spotName = spotName
        self.db = None
        
    def addData(self, local: str = 'local'):
        # Connect to database
        self.db = Database(local)
        
        # Retrieve all data from buoy
        data =  getAllData(self.buoyId, self.spotName)
        
        # Insert data into database
        self.db.insert('buoy', data)