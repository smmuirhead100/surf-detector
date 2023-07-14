import unittest
import sys 

# Import path
sys.path.append('../')

# Import methods to test
from db_methods import Database

#----------------------#
#----- Unit Tests -----#

#Test database connection
class TestDatabaseMethods(unittest.TestCase):
    
    # Test connection to database
    def testConnection(self):
        try: 
            test = Database()
        except:
            self.fail("Database connection failed")

if __name__ == '__main__':
    unittest.main()