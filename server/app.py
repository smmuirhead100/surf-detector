from flask import Flask, jsonify
import psycopg2
import os
import time
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
application = app

@app.route('/')
def hello_world():
    return 'Hello Imposter!'

@application.route("/tide")
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

@application.route("/wave")
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


@application.route("/wind")
def get_wind_data():
    print("Connecting to Supabase instance")
    clause = "SELECT * FROM wind WHERE timestamp > " + str(int(time.time())) + " ORDER BY timestamp;"
    conn = psycopg2.connect(os.environ.get('SUPABASE_URL'))
    with conn.cursor() as cur:
        cur.execute(clause)
        result = cur.fetchall()
        conn.commit()
        cur.close()
    
    tide_data = [{"timestamp": row[0], "utcoffset": row[1], "speed": row[2], "direction": row[3], "directiontype": row[4], "gust": row[5], "optimalscore": row[6], "spotid": row[7]} for row in result]
    
    # Convert the result into JSON format
    json_result = json.dumps(tide_data)
    
    return json_result

@application.route("/weather")
def get_weather_data():
    print("Connecting to Supabase instance")
    clause = "SELECT * FROM weather WHERE timestamp > " + str(int(time.time())) + " ORDER BY timestamp;"
    conn = psycopg2.connect(os.environ.get('SUPABASE_URL'))
    with conn.cursor() as cur:
        cur.execute(clause)
        result = cur.fetchall()
        conn.commit()
        cur.close()
    
    tide_data = [{"timestamp": row[0], "utcoffset": row[1], "temperature": row[2], "condtion": row[3], "pressure": row[4], "spotid": row[5]} for row in result]
    
    # Convert the result into JSON format
    json_result = json.dumps(tide_data)
    
    return json_result


@application.route("/rating")
def get_rating_data():
    print("Connecting to Supabase instance")
    clause = "SELECT * FROM rating WHERE timestamp > " + str(int(time.time())) + " ORDER BY timestamp;"
    conn = psycopg2.connect(os.environ.get('SUPABASE_URL'))
    with conn.cursor() as cur:
        cur.execute(clause)
        result = cur.fetchall()
        conn.commit()
        cur.close()
    
    tide_data = [{"timestamp": row[0], "utcoffset": row[1], "rating": {"description": row[2].strip("(").split(",")[0], "value": int(row[2].strip("(").split(",")[1].strip(')'))}, "spotid": row[3]} for row in result]
    
    # Convert the result into JSON format
    json_result = json.dumps(tide_data)
    
    return json_result

@application.route("/crowd")
def get_crowd_data():
    print("Connecting to Supabase instance")
    clause = "SELECT * FROM crowd ORDER BY timestamp;"
    conn = psycopg2.connect(os.environ.get('SUPABASE_URL'))
    with conn.cursor() as cur:
        cur.execute(clause)
        result = cur.fetchall()
        conn.commit()
        cur.close()
    
    tide_data = [{"timestamp": row[0], "crowd": row[1], "spotid": row[2], "spotname": row[3]} for row in result]
    
    # Convert the result into JSON format
    json_result = json.dumps(tide_data)
    
    return json_result

@application.route("/buoy")
def get_buoy_data():
    def parseSwell(swell_str: str):
        row = swell_str.strip("()").split(',')
        obj = {
            "height": float(row[0]),
            "period": float(row[1]),
            "direction": row[2],
            "compass": int(row[3])
        }
        return obj
    
    def parseWeather(weather_str: str):
        row = weather_str.strip("()").split(',')
        obj = {
            "temp": float(row[0]),
            "wind": float(row[1]),
            "winddir": row[2],
            "precip": float(row[3]),
            "currClouds": float(row[4])
        }
        return obj
    
    print("Connecting to Supabase instance")
    clause = "SELECT * FROM buoy ORDER BY timestamp;"
    conn = psycopg2.connect(os.environ.get('SUPABASE_URL'))
    with conn.cursor() as cur:
        cur.execute(clause)
        result = cur.fetchall()
        conn.commit()
        cur.close()
    
    tide_data = [{"timestamp": row[0], "buoyid": row[1], "spotname": row[2], "swell": parseSwell(row[3]), "weather": parseWeather(row[4])} for row in result]
    
    # Convert the result into JSON format
    json_result = json.dumps(tide_data)
    
    return json_result

if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()