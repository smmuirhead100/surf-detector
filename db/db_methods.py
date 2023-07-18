import os
import psycopg2
import json

# The database object connects to the CockroachDB instance, OR local instance defined in your .env file and allows you to manipulate it. 
# Ex. postgresql://username:vr2ckLMesoF4d6WYvs-0Kg@my-instance2343.g95.cockroachlabs.cloud:26342/my_database?sslmode=verify-full
# Some methods return true for testing purposes.

class Database:
    
    def __init__(self, conn : str = ""):
        if conn == 'local': # Connect to local instance
            DB_HOST = os.environ.get('DB_HOST')
            DB_NAME = os.environ.get('DB_NAME')
            DB_USER = os.environ.get('DB_USER')
            DB_PASSWORD = os.environ.get('DB_PASS')
            PORT_ID = os.environ.get('PORT_ID')
            self.conn = psycopg2.connect(host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, port=PORT_ID)
        else: # Connect to CockroachDB instance
            self.conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
    
    # Begin postgres transaction
    def begin(self):
        with self.conn.cursor() as cur:
            cur.execute("BEGIN;")
            self.conn.commit()
            cur.close()
            
    # Create table with specified name and columns
    def createTable(self, tableName, columns):
        with self.conn.cursor() as cur:
            cur.execute("CREATE TABLE IF NOT EXISTS " + tableName + " (" + columns + ");")
            self.conn.commit()
            print("Created table if didn't exist: " + tableName)
            cur.close()
    
    # Get table with specified name and columns, with optional WHERE clause
    def getTable(self, tableName, columns = "*", where = None):
        columns = ', '.join(columns)
        with self.conn.cursor() as cur:
            if where is None:
                cur.execute("SELECT " + columns + " FROM " + tableName + ";")
            else:
                where_clause = ' AND '.join(where)
                cur.execute("SELECT " + columns + " FROM " + tableName + " WHERE " + where_clause + ";")
            res = cur.fetchall()
            return res
    
    # Insert row into table if it doesn't already exist
    def insert(self, tableName, data):
        with self.conn.cursor() as cur:
            try:
                # Check if a row with the same data already exists
                print(data)
                print(tableName)
                query = "SELECT EXISTS(SELECT timestamp FROM " + tableName + " WHERE " + "timestamp = " + str(data['timestamp']) + ");"
                cur.execute(query, tuple(data.values()))
                row_exists = cur.fetchone()[0]
                if row_exists:
                    print("Row already exists in table:", tableName)
                    return True
                else:
                    # Insert the row if it doesn't already exist
                    columns = ', '.join(data.keys())
                    values = ', '.join(['%s'] * len(data))
                    query = "INSERT INTO " + tableName + " (" + columns + ") VALUES (" + values + ");"
                    dataList = self.flatten(data)
                    cur.execute(query, dataList)
                    self.conn.commit()
                    cur.close()
                    return True
            except psycopg2.Error as e:
                # Roll back the transaction on error
                self.conn.rollback()
                print("Transaction rolled back:", e)
                return False
        
    # Update row(s) in table
    def update(self, tableName, where, data):
        with self.conn.cursor() as cur:
            set_clause = ', '.join([f"{key} = %s" for key in data.keys()])
            where_clause = ' AND '.join(where)
            values = list(data.values())
            query = "UPDATE " + tableName + " SET " + set_clause + " WHERE " + where_clause + ";"
            cur.execute(query, values)
            self.conn.commit()
            cur.close()
            return True
    
    # Delete row(s) from table
    def delete(self, tableName, where):
        with self.conn.cursor() as cur:
            where_clause = ' AND '.join(where)
            query = "DELETE FROM " + tableName + " WHERE " + where_clause + ";"
            cur.execute(query)
            self.conn.commit()
            cur.close()
            return True
    
    # Create type with specified name and columns
    def createType(self, typeName, columns):
        with self.conn.cursor() as cur:
            try:
                # Check if the type already exists
                query = "SELECT EXISTS(SELECT 1 FROM pg_type WHERE typname = '" + typeName + "');"
                cur.execute(query)
                type_exists = (cur.fetchall()[0])
                if type_exists:
                    print("Type already exists: " + typeName)
                    return False
                else:
                    # Create the type if it doesn't already exist
                    cur.execute("CREATE TYPE " + typeName + " AS (" + columns + ");")
                    self.conn.commit()
                    cur.close()
                    return True
            except psycopg2.Error as e:
                # Roll back the transaction on error
                self.conn.rollback()
                print("Transaction rolled back:", e)
                return False
        
    # Remove a composite type from the database
    def dropType(self, typeName):
        with self.conn.cursor() as cur:
            cur.execute("DROP TYPE " + typeName + ";")
            self.conn.commit()
            cur.close()
            print("Dropped type " + typeName)
            return True
    
    # Remove a table from the database
    def dropTable(self, tableName):
        with self.conn.cursor() as cur:
            cur.execute("DROP TABLE " + tableName + ";")
            self.conn.commit()
            cur.close()
            print("Dropped table " + tableName)
            return True
        
    # Custom query!
    def customQuery(self, query):
        with self.conn.cursor() as cur:
            cur.execute(query)
            self.conn.commit()
            cur.close()
            return True
        
    # Helper function to flatten nested types
    def flatten(self, data: dict) -> list:
        result = []
        for value in data.values():
            if isinstance(value, dict):
                result.append(self.flatten(value))
            elif isinstance(value, list): # To compensate for the swells array
                swells = ([self.flatten(arr) for arr in value])
                result.append(swells)
            else:
                result.append(value)
        # Make results a tuple of tuples
        if isinstance(result, list):
            result = tuple(result)
        return result
    
    def close(self):
        self.conn.close()
        return True
    