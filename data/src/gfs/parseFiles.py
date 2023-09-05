import datetime
import time
import os

def parseBullFile2(file):

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
                    swellArray.append({'height': height, 'period': period, 'direction': direction})
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

def parseFiles(folder_path):
    # List all files in the directory
    file_list = os.listdir(folder_path)

    # Filter only the bull files
    bull_files = [file for file in file_list if file.endswith('.bull')]

    # Loop through each bull file and call the function
    result = []
    for bull_file in bull_files:
        file_path = os.path.join(folder_path, bull_file)
        result.append(parseBullFile2(file_path))
        # Do something with the result if needed
    return result

if __name__ == "__main__":
    result = parseFiles('extracted_bull_data')
    res = [i for i in result if i['buoyId'] == '46222']
    print(res)