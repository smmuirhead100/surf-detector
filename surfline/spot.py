import time
import sys

# So it can run with root dir
sys.path.append('../')

from surfline.surfline_api import SurflineAPI
from db.db_methods import Database
from surfline.utilities.cam_screenshot import takeScreenshot
from models.surfer_detection.detector import detect

# A class to define spots in Surfline's database.
class Spot:
    def __init__(self, commonName: str, spotId: str, camName: str, nearestBuoyId: str):
        self.commonName = commonName        # Ex. 'Huntington Beach'
        self.spotId = spotId                # Ex. '5842041f4e65fad6a7709b9d'
        self.camName = camName              # Ex. 'goldenwest'
        self.nearestBuoyId = nearestBuoyId  # Ex. '46222'
        self.surflineData = None
        self.db = None
        
    def addSurflineData(self, key, local: bool = True):
        
        # Helper Function to insert data into database
        def insert(table: str, data: list):
            for row in data:
                self.db.insert(table, row)
                
        # Connect to database
        if local == True:
            self.db = Database('local')
        else:
            self.db = Database('remote')
        
        # Get Surfline Data
        self.surflineData = SurflineAPI(self.spotId, key)
        
        # Insert Surfline Data
        insert('tide', self.surflineData.tide)
        insert('wave', self.surflineData.wave)
        insert('wind', self.surflineData.wind)
        insert('weather', self.surflineData.weather)
        insert('rating', self.surflineData.rating)
        
        self.db.close() # Close connection to database
        
        return True
    
    def addCrowdData(self, local: bool = True):
        # Connect to database
        if local == True:
            self.db = Database('local')
        else:
            self.db = Database('remote')
        
        # Saves the current cam to /assets/captures
        savedpath = takeScreenshot(self.camName)
        
        # Detects the number of surfers in the water
        surfersDetected = detect(savedpath)
        
        # Inserts the data into the database
        self.db.insert('crowd', {'timestamp': int(time.time()), 'crowd': surfersDetected, 'spotId': self.spotId})
        
        self.db.close() # Close connection to database
        
        return True
        
            
            
        