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

def main():
    conn = psycopg2.connect(os.environ["DATABASE_URL"], application_name="docs_quickstart_python")
    exec_statement(conn, "CREATE TABLE test2 (id serial PRIMARY KEY, age INTEGER, name VARCHAR);")
    # Insert 3 people into the table
    exec_statement(conn, "INSERT INTO test2 (age, name) VALUES (10, 'Alec');")
    exec_statement(conn, "INSERT INTO test2 (age, name) VALUES (20, 'Bob');")
    exec_statement(conn, "INSERT INTO test2 (age, name) VALUES (30, 'Cathy');")
    # Print out the table contents
    exec_statement(conn, "SELECT * FROM test2;")
main()