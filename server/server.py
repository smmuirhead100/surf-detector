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

@app.route("/wave")
def waves():
   
    # Helper function to parse the swell string into a dictionary
    def parse_swell(swell_str: str):
        # Assuming swell_str is in the format: "(2,3,0,f,\"Thigh to waist\",\"(1.44357,2.42782)\")"
        # Remove the outer parentheses and split the values
        values = swell_str.strip("()").split(',')

        # Convert the values to the appropriate types
        min = float(values[0])
        max = int(values[1])
        optimalScore = int(values[2])
        plus = values[3].strip("\"")
        humanRelation = values[4].strip("\"")
        rawMin = values[5].strip("\"()").split(',')
        rawMax = values[6].strip("\"()").split(',')

        return {
            "min": min,
            "max": max,
            "optimalScore": optimalScore,
            "plus": plus,
            "humanRelation": humanRelation,
            "rawSurf": {"rawMin": float(rawMin[0]), "rawMax": float(rawMax[0])}
        }
        
    print("Connecting to Supabase instance")
    clause = "SELECT * FROM wave WHERE timestamp > " + str(int(time.time())) + " ORDER BY timestamp;"
    conn = psycopg2.connect(os.environ.get('SUPABASE_URL'))
    with conn.cursor() as cur:
        cur.execute(clause)
        result = cur.fetchall()
        conn.commit()
        cur.close()
    
    wave_data = [{"timestamp": row[0], "probability": row[1], "utcoffset": row[2], "surf": parse_swell(row[3]), "power": row[4], "swell": row[5], "spotid": row[6]} for row in result]

    # Convert the result into JSON format
    json_result = json.dumps(wave_data)

    return json_result
