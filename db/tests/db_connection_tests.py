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
            test = Database('local')
        except:
            self.fail("Database connection failed")
            
    # Test creating a table
    def createTable(self):
        test = Database('local')
        self.assertTrue(test.createTable("test_table", "id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL"))

if __name__ == '__main__':
    unittest.main()