import os
import psycopg2
from psycopg2.errors import ProgrammingError


def exec_statement(conn, stmt):
    try:
        with conn.cursor() as cur:
            cur.execute(stmt)
            rows = cur.fetchall()
            conn.commit()
            for row in rows:
                print(row)
    except (ProgrammingError, psycopg2.DatabaseError) as error:
        print("Error executing SQL statement:", error)
        conn.rollback()

def insert_to_database(report):
    conn = psycopg2.connect(os.environ["DATABASE_URL"], application_name="")


# Testing the connection
def main():
    with psycopg2.connect(os.environ['DATABASE_URL']) as conn:
        
        exec_statement(conn, "CREATE TABLE IF NOT EXISTS test3 (id serial PRIMARY KEY, age INTEGER, name VARCHAR);")
        # Insert 3 people into the table
        exec_statement(conn, "INSERT INTO test3 (age, name) VALUES (10, 'Alec');")
        exec_statement(conn, "INSERT INTO test2 (age, name) VALUES (20, 'Bob');")
        exec_statement(conn, "INSERT INTO test2 (age, name) VALUES (30, 'Cathy');")
        # Print out the table contents

        exec_statement(conn, "SELECT * FROM test2;")



# Apply these schemas once the database is configured
def schemas(): 
    with psycopg2.connect(os.environ['DATABASE_URL']) as conn:
        exec_statement(conn, """
                            CREATE TYPE IF NOT EXISTS Swell AS (
                                height FLOAT,
                                period FLOAT,
                                direction STRING, 
                                compass FLOAT
                            );
                    """)
        
        exec_statement(conn, """
                            CREATE TYPE IF NOT EXISTS Weather AS (
                                time STRING,
                                temp FLOAT,
                                wind FLOAT,
                                windDir STRING,
                                precip FLOAT,
                                currCloud FLOAT
                            );
                    """)
        
        exec_statement(conn, """
                            CREATE TABLE testSurf (
                                id serial PRIMARY KEY, 
                                swell Swell,
                                weather Weather,
                                locationID STRING,
                                Name STRING,
                                crowd INTEGER
                            );
                    """)
        
        exec_statement(conn, "SHOW TYPES;")



main()