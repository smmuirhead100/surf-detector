from flask import Flask, request
from flask_cors import CORS
import psycopg2
import os
import time
import json
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

app = Flask(__name__)
CORS(app)
application = app

beginning_of_today = int(time.mktime(datetime.now().date().timetuple()))
    
spotDict = {
    'malibu': '5842041f4e65fad6a7708817',
    'huntington_beach': '5842041f4e65fad6a77088ea',
    'newport_beach': '5842041f4e65fad6a7708e54',
    'salt_creek': '5842041f4e65fad6a770882e',
    'san_onofre': '5842041f4e65fad6a7708831'
}

nameDict = {
    '5842041f4e65fad6a7708817': 'Malibu',
    '5842041f4e65fad6a77088ea': 'Huntington Beach',
    '5842041f4e65fad6a7708e54': 'Newport Beach',
    '5842041f4e65fad6a770882e': 'Salt Creek', 
    '5842041f4e65fad6a7708831': 'San Onofre'
}

@app.route('/')
def hello_world():
    return 'Hello Imposter!'

@application.route("/tide", methods=['GET'])
def get_tide_data():
    if 'spot' in request.args:
        spot_id = spotDict[str(request.args['spot'])]
        print(spot_id)
        print(type(spot_id))
        clause = f"SELECT * FROM tide WHERE timestamp > {beginning_of_today} AND spotid = '{spot_id}' ORDER BY timestamp;"
        
    else: 
        clause = f"SELECT * FROM tide WHERE timestamp > {beginning_of_today} ORDER BY timestamp;"
    print("Connecting to Supabase instance")
    conn = psycopg2.connect(os.environ.get('SUPABASE_URL'))
    with conn.cursor() as cur:
        cur.execute(clause)
        result = cur.fetchall()
        conn.commit()
        cur.close()
    
    tide_data = [{"timestamp": row[0], "utcoffset": row[1], "type": row[2], "height": row[3], "spotid": row[4]} for row in result]
    
    # Convert the result into JSON format
    json_result = json.dumps(tide_data)
    
    print('Done Executing')
    return json_result

@application.route("/wave", methods=['GET'])
def waves():
    beginning_of_today = int(time.mktime(datetime.now().date().timetuple()))
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
        
    if 'spot' in request.args:
        spot_id = spotDict[str(request.args['spot'])]
        print(spot_id)
        print(type(spot_id))
        clause = f"SELECT * FROM wave WHERE timestamp > {beginning_of_today} AND spotid = '{spot_id}' ORDER BY timestamp;"
        
    else: 
        clause = f"SELECT * FROM wave WHERE timestamp > {beginning_of_today} ORDER BY timestamp;"
    
    print("Connecting to Supabase instance")
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


@application.route("/wind", methods=['GET'])
def get_wind_data():
    
    if 'spot' in request.args:
        spot_id = spotDict[str(request.args['spot'])]
        print(spot_id)
        print(type(spot_id))
        clause = f"SELECT * FROM wind WHERE timestamp > {beginning_of_today} AND spotid = '{spot_id}' ORDER BY timestamp;"
        
    else: 
        clause = f"SELECT * FROM wind WHERE timestamp > {beginning_of_today} ORDER BY timestamp;"
    
    print("Connecting to Supabase instance")
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

@application.route("/weather", methods=['GET'])
def get_weather_data():
    if 'spot' in request.args:
        spot_id = spotDict[str(request.args['spot'])]
        print(spot_id)
        print(type(spot_id))
        clause = f"SELECT * FROM weather WHERE timestamp > {beginning_of_today} AND spotid = '{spot_id}' ORDER BY timestamp;"
        
    else: 
        clause = f"SELECT * FROM weather WHERE timestamp > {beginning_of_today} ORDER BY timestamp;"
    
    print("Connecting to Supabase instance")
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


@application.route("/rating", methods=['GET'])
def get_rating_data():
    beginning_of_today = int(time.mktime(datetime.now().date().timetuple()))
    if 'spot' in request.args:
        spot_id = spotDict[str(request.args['spot'])]
        print(spot_id)
        print(type(spot_id))
        clause = f"SELECT * FROM rating WHERE timestamp > {beginning_of_today} AND spotid = '{spot_id}' ORDER BY timestamp;"
        
    else: 
        clause = f"SELECT * FROM rating WHERE timestamp > {beginning_of_today} ORDER BY timestamp;"
    
    print("Connecting to Supabase instance")
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

@application.route("/crowd", methods=['GET'])
def get_crowd_data():
    if 'spot' in request.args:
        spot_id = spotDict[str(request.args['spot'])]
        print(spot_id)
        print(type(spot_id))
        clause = "SELECT * FROM crowd WHERE spotid = '" + spot_id + "'ORDER BY timestamp;"
        
    else: 
        clause = "SELECT * FROM crowd ORDER BY timestamp;"
    
    print("Connecting to Supabase instance")
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

@application.route("/buoy", methods=['GET'])
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

@application.route("/spots", methods=['GET'])
def get_spots():
    
    clause = "SELECT DISTINCT spotid FROM wave;"
    
    print("Connecting to Supabase instance")
    conn = psycopg2.connect(os.environ.get('SUPABASE_URL'))
    with conn.cursor() as cur:
        cur.execute(clause)
        result = cur.fetchall()
        conn.commit()
        cur.close()
    
    spots = [nameDict[row[0]] for row in result]
    
    # Convert the result into JSON format
    json_result = json.dumps(spots)
    
    return json_result

if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()