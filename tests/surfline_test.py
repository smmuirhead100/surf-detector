import unittest

# Add directories to current path
import sys
sys.path.append('../')
sys.path.append('../surfline')

# Import methods to test
from surfline.surfline_data import getTides, getWaves

#----------------------#
#----- Unit Tests -----#

# Test surfline_data.py methods
class TestSurflineMethods(unittest.TestCase):
    
    # Test getTides() method. Make sure it is a list, and is not empty.
    def testGetTides(self):
        tides = (getTides('5842041f4e65fad6a7708a7a'))
        self.assertEqual(type(tides), type([]))
        self.assertGreaterEqual(len(tides), 1)
        
    # Test getWaves() method. Make sure it is a list, and is not empty.
    def testGetWaves(self):
        waves = (getWaves('5842041f4e65fad6a7708a7a'))
        self.assertEqual(type(waves), type([]))
        self.assertGreaterEqual(len(waves), 1)
        
        
if __name__ == '__main__':
    unittest.main()