import datetime
import time
import os
import sys
import psycopg2
sys.path.append("../")
from db.db_methods import Database
from utils.direction_converter import convert
from utils.retrieveFile import retrieveFile
from utils.decompressFile import decompressFile

class GFSStationDataParser:
    def __init__(self, stations=None, all=False, folder_path='extracted_bull_data', db='local'):
        self.stations = stations
        self.all = all
        self.folder_path = folder_path
        self.data = []
        self.db = Database(db)
    
    def parseBullFile(self, file):
        # Helper function
        def getUnix(year, month, day, hour): 
            date_time = datetime.datetime(year, month, day, hour, 0, 0)
            return (time.mktime(date_time.timetuple()))

        # Open the file and read its content
        with open(file, 'r') as file:
            bull_data = file.read()

        # Split the data into lines
        lines = bull_data.split('\n')
        
        buoyId = str(lines[0][12:23]).strip()
        utcOffset = int(str(lines[2][23:25]).strip())
        year = int(str(lines[2][12:17]).strip())
        month = int(str(lines[2][17:19]).strip())
        startingDay = int(str(lines[2][19:21]).strip())
        
        # Initialize the return object
        returnObject = {}
        returnObject['data'] = []
        returnObject['buoyId'] = buoyId

        # Skip lines until reaching the data rows
        plus = 0
        for i in range(len(lines) - 1):
            line = lines[i]
            if plus >= 2:
                if line[1] == '+':
                    print(f"Finished parsing file: {file}")
                    return returnObject
                else:
                    
                    # Timestamp Data
                    day = int(line[3:5])
                    hour = int(line[6:8])
                    if (day < startingDay):         # Account for new month
                        monthHolder = month + 1
                    else: 
                        monthHolder = month
                    unix = getUnix(year, monthHolder, day, hour)
                    timestamp = {'day': day, 'hour': hour, 'year': year, 'month': monthHolder, 'unix': unix, 'offset': utcOffset} 

                    # Swell Data
                    swellArray = []
                    significantHeight = (line[10:15])
                    swellsDetected = min(int(line[16:18]), 6) # Max it can go is 6                    
                    heightIndex = 24
                    periodIndex = 29
                    directionIndex = 35
                    for index in range(swellsDetected):
                        height = float(line[heightIndex : heightIndex + 5])
                        period = float(line[periodIndex : periodIndex + 4])
                        direction = int(line[directionIndex : directionIndex + 3])
                        swellArray.append({'height': height, 'period': period, 'direction': convert(direction)})
                        heightIndex += 18
                        periodIndex += 18
                        directionIndex += 18
                    
                    max_product = float('-inf')
                    max_index = -1
                    # Find the index of the object with the maximum height * period product
                    for i, obj in enumerate(swellArray):
                        product = obj['height'] * obj['period']
                        if product > max_product:
                            max_product = product
                            max_index = i

                    if max_index != -1:
                        # Replace the object with zero height
                        swellArray[max_index]['height'] = significantHeight
                    
                    returnObject['data'].append({'buoyId': buoyId,'timestamp': timestamp, 'swellArray': swellArray})
            elif lines[i][1] == '+':
                plus += 1
        return returnObject

    def parseFiles(self):
        
        # List all files in the directory
        file_list = os.listdir(self.folder_path)
        if self.all:
            # Filter all files that end with .bull
            bull_files = [file for file in file_list if file.endswith('.bull')]
        elif self.stations:
            # Filter files based on the specified stations
            bull_files = [file for file in file_list if file.endswith('.bull') and any(station in file for station in self.stations)]
        else: 
            # Nothing was specified, so the function should no nothing.
            raise ValueError("No filter specified for parsing files. Set 'stations' or 'all' parameter accordingly.")

        # Loop through each bull file and call the parsing function
        for bull_file in bull_files:
            file_path = os.path.join(self.folder_path, bull_file)
            self.data.append(self.parseBullFile(file_path))

        # Returns an array of objects for each file parsed
        return self.data

    def add_to_db(self):
        db = Database('local')
        for file in self.data:
            buoy_id = file['buoyId']
            if buoy_id in self.stations or self.all:
                for timepoint in file['data']:
                    timestamp = timepoint['timestamp']['unix']
                    try:
                        # Check if the timestamp and buoy combination already exists
                        main_id = self.get_main_id_by_timestamp_buoyid(db, timestamp, buoy_id)
                        if main_id:
                            for swell in timepoint['swellArray']:
                                query_update_child = f"""
                                    UPDATE historical_buoy.swell
                                    SET height = {swell['height']}, period = {swell['period']}, direction = {swell['direction']}
                                    WHERE main_id = {main_id};
                                """
                                self.db.customQuery(query_update_child)
                        else:
                            # Insert a new row if the timestamp and buoy combination doesn't exist
                            query_insert_main = f"""
                                INSERT INTO historical_buoy.buoy (timestamp, buoyid)
                                VALUES ({timestamp}, '{buoy_id}')
                                RETURNING id;
                            """
                            main_id = self.db.customQueryFetch(query_insert_main)[0][0]
                            for swell in timepoint['swellArray']:
                                query_insert_swell = f"""
                                    INSERT INTO historical_buoy.swell (main_id, height, period, direction)
                                    VALUES ({main_id}, {swell['height']}, {swell['period']}, {swell['direction']});
                                """
                                self.db.customQuery(query_insert_swell)
                    except psycopg2.errors.UniqueViolation:
                        # Handle the unique violation error (if necessary)
                        pass

    def get_main_id_by_timestamp_buoyid(self, db, timestamp, buoyid):
        query = f"""
            SELECT id FROM historical_buoy.buoy
            WHERE timestamp = {timestamp} AND buoyid = '{buoyid}';
        """
        result = db.customQueryFetch(query)
        if result:
            return result[0][0]
        else:
            return None
                        
    def parse_and_add_to_db(self):
        self.retrieveFile()
        self.parseFiles()
        self.add_to_db()

    def retrieveFile(self):
        file_name = retrieveFile()
        if file_name:
            decompressFile(file_name, self.folder_path)
        else:
            raise ValueError("Error retrieving the file.")
        
    def decompressFile(self, file_name, out_file):
        decompressFile(file_name, out_file)
  

#----------EXAMPLE USAGE-----------#
# This will add all the current data for station 46222 to you local postgres instance. 
    # test = GFSStationDataParser(stations=['46222'])
    # test.parse_and_add_to_db()
        