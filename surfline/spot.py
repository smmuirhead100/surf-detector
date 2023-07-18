import time

from surfline_api import SurflineAPI
from db.db_methods import Database
from surfline.utilities.cam_screenshot import screenshotCam
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
        
    def addSurflineData(self, local: bool = True):
        # Connect to database
        if local == True:
            self.db = Database('local')
        else:
            self.db = Database('remote')
        
        # Get Surfline Data
        self.surflineData = SurflineAPI(self.spotId)
        
        # Insert Surfline Data
        self.db.insert('tide', self.surflineData.tide)
        self.db.insert('wave', self.surflineData.wave)
        self.db.insert('wind', self.surflineData.wind)
        self.db.insert('weather', self.surflineData.weather)
        self.db.insert('rating', self.surflineData.rating)
        
        self.db.close() # Close connection to database
        
        return True
    
    def addCrowdData(self, local: bool = True):
        # Connect to database
        if local == True:
            self.db = Database('local')
        else:
            self.db = Database('remote')
        
        # Saves the current cam to /assets/captures
        savedpath = screenshotCam(self.camName)
        
        # Detects the number of surfers in the water
        surfersDetected = detect(savedpath)
        print(surfersDetected)
        
        # Inserts the data into the database
        self.db.insert('crowd', {'timestamp': int(time.time()), 'crowd': surfersDetected, 'spotId': self.spotId})
        
        self.db.close() # Close connection to database
        
        return True
        
            
            
        