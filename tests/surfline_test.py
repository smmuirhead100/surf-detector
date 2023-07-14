import unittest

# Add directories to current path
import sys
sys.path.append('../')
sys.path.append('../surfline')

# Import methods to test
from surfline.surfline_data import SurflineData

#----------------------#
#----- Unit Tests -----#

# Test surfline_data.py methods
class TestSurflineMethods(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.test  = SurflineData('5842041f4e65fad6a7708a7a')
    
    # Test getTides() method. Make sure it is a list, and is not empty.
    def testGetTides(self):
        tides = self.test.tides
        self.assertEqual(type(tides), type([]))
        self.assertGreaterEqual(len(tides), 1)
        
    # Test getWaves() method. Make sure it is a list, and is not empty.
    def testGetWaves(self):
        waves = self.test.waves
        self.assertEqual(type(waves), type([]))
        self.assertGreaterEqual(len(waves), 1)
        
    # Test `getWind()` method. Make sure it is a list, and is not empty.
    def testGetWind(self):
        wind = self.test.wind
        self.assertEqual(type(wind), type([]))
        self.assertGreaterEqual(len(wind), 1)
        
    # Test getWeather() method. Make sure it is a list, and is not empty.
    def testGetWeather(self):
        weather = self.test.weather
        self.assertEqual(type(weather), type([]))
        self.assertGreaterEqual(len(weather), 1)
        
    # Test getRatings() method. Make sure it is a list, and is not empty.
    def testGetRatings(self):
        ratings = self.test.ratings
        self.assertEqual(type(ratings), type([]))
        self.assertGreaterEqual(len(ratings), 1)
        
if __name__ == '__main__':
    unittest.main()