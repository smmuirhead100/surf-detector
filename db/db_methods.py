import os
import psycopg2

# Connect to database by using the DATABASE_URL environment variable using dotenv


class Database:
    
    def __init__(self):
        self.conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
    
    # Create table with specified name and columns
    def createTable(self, tableName, columns):
        with self.conn.cursor() as cur:
            cur.execute("CREATE TABLE IF NOT EXISTS " + tableName + " (" + columns + ");")
            self.conn.commit()
    
    # Get table with specified name and columns
    def getTable(self, tableName, columns='*'):
        with self.conn.cursor() as cur:
            cur.execute("SELECT " + columns + " FROM " + tableName + ";")
            self.conn.commit()
            res = cur.fetchall()
            return res
    
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
            cur.execute("CREATE TYPE " + typeName + " AS (" + columns + ");")
            self.conn.commit()
            return True