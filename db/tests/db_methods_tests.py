import unittest
import os
import psycopg2

# Import path
import sys 
sys.path.append('../')

# Import methods to test
from db_methods import Database

#----------------------#
#----- Unit Tests -----#

# Test database connection
class TestDatabaseMethods(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        cls.db = Database()
        cls.db.createTable("test_table", "id SERIAL PRIMARY KEY, name VARCHAR(255), age INT")

    # Test insert method
    def testInsert(self):
        data = {"name": "John", "age": 30}
        result = self.db.insert("test_table", data)
        self.assertTrue(result)

    # Test update method
    def testUpdate(self):
        where = {"name": "John"}
        data = {"age": 40}
        result = self.db.update("test_table", where, data)
        self.assertTrue(result)

    # Test get method
    def testGetTable(self):
        where = {"name": "John"}
        result = self.db.getTable("test_table")
        self.assertTrue(result != None)
        
    # Test delete method
    def testDelete(self):
        where = {"name": "John"}
        result = self.db.delete("test_table", where)
        self.assertTrue(result)
        
    # Test createType method
    def testCreateType(self):
        result = self.db.createType("test_type", "name VARCHAR(255), age INT")
        self.assertTrue(result)

if __name__ == '__main__':
    unittest.main()