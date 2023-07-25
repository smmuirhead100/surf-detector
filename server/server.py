from flask import Flask, jsonify
import psycopg2
import os
import time
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route("/tide")
def get_tide_data():
    print("Connecting to Supabase instance")
    clause = "SELECT * FROM tide WHERE timestamp > " + str(int(time.time())) + " ORDER BY timestamp;"
    conn = psycopg2.connect(os.environ.get('SUPABASE_URL'))
    with conn.cursor() as cur:
        cur.execute(clause)
        result = cur.fetchall()
        conn.commit()
        cur.close()
    
    tide_data = [{"timestamp": row[0], "utcoffset": row[1], "type": row[2], "height": row[3], "spotid": row[4]} for row in result]
    
    # Convert the result into JSON format
    json_result = json.dumps(tide_data)
    
    return json_result

@app.route("/waves")
def waves():
    print("Connecting to Supabase instance")
    clause = "SELECT * FROM wave WHERE timestamp > " + str(int(time.time())) + " ORDER BY timestamp;"
    conn = psycopg2.connect(os.environ.get('SUPABASE_URL'))
    with conn.cursor() as cur:
        cur.execute(clause)
        result = cur.fetchall()
        conn.commit()
        cur.close()

    # Convert the result into JSON format
    json_result = json.dumps(result)

    return json_result
