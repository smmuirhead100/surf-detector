import os
import psycopg2

# The database object connects to the CockroachDB instance, OR local instance defined in your .env file and allows you to manipulate it. 
# Ex. postgresql://username:vr2ckLMesoF4d6WYvs-0Kg@my-instance2343.g95.cockroachlabs.cloud:26342/my_database?sslmode=verify-full
# Some methods return true for testing purposes.

class Database:
    
    def __init__(self, conn : str = ""):
        
        if conn == 'local':
            DB_HOST = os.environ.get('DB_HOST')
            DB_NAME = os.environ.get('DB_NAME')
            DB_USER = os.environ.get('DB_USER')
            DB_PASSWORD = os.environ.get('DB_PASS')
            PORT_ID = os.environ.get('PORT_ID')
            self.conn = psycopg2.connect(host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, port=PORT_ID)
        else: 
            self.conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
    
    # Create table with specified name and columns
    def createTable(self, tableName, columns):
        with self.conn.cursor() as cur:
            cur.execute("CREATE TABLE IF NOT EXISTS " + tableName + " (" + columns + ");")
            self.conn.commit()
    
    # Get table with specified name and columns, with optional WHERE clause
    def getTable(self, tableName, columns, where = None):
        with self.conn.cursor() as cur:
            if where is None:
                cur.execute("SELECT " + columns + " FROM " + tableName + ";")
            else:
                where_clause = ' AND '.join([f"{key} = %s" for key in where.keys()])
                values = list(where.values())
                cur.execute("SELECT " + columns + " FROM " + tableName + " WHERE " + where_clause + ";", values)
            return cur.fetchall()
    
    # Insert row into table
    def insert(self, tableName, data):
        with self.conn.cursor() as cur:
            columns = ', '.join(data.keys())
            values = ', '.join(['%s'] * len(data))
            query = "INSERT INTO " + tableName + " (" + columns + ") VALUES (" + values + ");"
            cur.execute(query, list(data.values()))
            self.conn.commit()
            return True
    
    # Update row(s) in table
    def update(self, tableName, where, data):
        with self.conn.cursor() as cur:
            set_clause = ', '.join([f"{key} = %s" for key in data.keys()])
            where_clause = ' AND '.join([f"{key} = %s" for key in where.keys()])
            values = list(data.values()) + list(where.values())
            query = "UPDATE " + tableName + " SET " + set_clause + " WHERE " + where_clause + ";"
            cur.execute(query, values)
            self.conn.commit()
            return True
    
    # Delete row(s) from table
    def delete(self, tableName, where):
        with self.conn.cursor() as cur:
            where_clause = ' AND '.join([f"{key} = %s" for key in where.keys()])
            values = list(where.values())
            query = "DELETE FROM " + tableName + " WHERE " + where_clause + ";"
            cur.execute(query, values)
            self.conn.commit()
            return True
    
    # Create type with specified name and columns
    def createType(self, typeName, columns):
        with self.conn.cursor() as cur:
            cur.execute("CREATE TYPE IF NOT EXISTS " + typeName + " AS (" + columns + ");")
            self.conn.commit()
            return True