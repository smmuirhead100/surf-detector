import unittest
import os
import psycopg2

# Import path
import sys 
sys.path.append('../')

# Import methods to test
from db_methods import Database
from db_config import SurflineTypes

#----------------------#
#----- Unit Tests -----#

# Test database Surfline Configuration. addTypes and addTables are commented because they are only needed to be run once.
class TestDatabaseMethods(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        cls.db = Database('local')
        cls.surfData = SurflineTypes(cls.db)

    # def testAddTypes(self):
    #     result = self.surfData.addTypes()
    #     self.assertTrue(result)
    
    def testAddTables(self):
        result = self.surfData.addTables()
        self.assertTrue(result)

    # # Test insert tide data
    # def testInsertTide(self):
    #     self.db.insert("tide", {"timestamp": 123456789, "utcOffset": 0, "type": "HIGH", "height": 1.2})
    #     self.db.insert("tide", {"timestamp": 123456790, "utcOffset": 0, "type": "LOW", "height": 0.2})
    

    # Test insert wave data
    def testInsertWave(self):
        surf = {
            "min": 1, "max": 2, "optimalScore": 1, "plus": True, "humanRelation": "FAIR", "raw": {"min": 1, "max": 2}
        }
        
        swells = [{"height": 1.2, "period": 12.3, "impact": 1.2, "power": 1.2, "direction": 1.2, "directionMin": 1.2, "optimalScore": 1}, {"height": 1.2, "period": 12.3, "impact": 1.2, "power": 1.2, "direction": 1.2, "directionMin": 1.2, "optimalScore": 1}]
        
        self.db.insert("wave", {"timestamp": 12949433, "probability": 0, "utcOffset": -4, "surf": surf, "power": 1.2, "swell": swells[0]})
    
    # Test get tide data
    def testGetTides(self):
        result = self.db.getTable("tide")
            
    # Test get wave data
    def testGetWaves(self):
        print('getting waves')
        result = self.db.getTable("wave", ["timestamp"])
        for row in result:
            time = row[0]
            print(time + 10) # To make sure what we are getting is actually an integer
            
if __name__ == '__main__':
    unittest.main()