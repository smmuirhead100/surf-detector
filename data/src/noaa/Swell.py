import requests
import csv

# Retrieves real time wave data from NOAA API. 

def getSwellData(location):
    url = 'https://www.ndbc.noaa.gov/data/realtime2/' + location + '.spec'
    response = requests.get(url)
    
    if response.status_code == 200:
        # Process the response data
        lines = response.text.splitlines()
        reader = csv.reader(lines, delimiter=' ', skipinitialspace=True)
        
        header_lines = 2
        for i in range(header_lines):
            next(reader)
        
        for row in reader:
            data = row
            break
        
        # Add to the return dictionary
        returnDict = {}
        returnDict['height'] = data[6]
        returnDict['period'] = data[7]
        returnDict['direction'] = data[11]
        returnDict['compass'] = data[14]
        
        return returnDict

    else:
        # Return an error message
        print('Error: Failed to retrieve data from the NOAA API.', status=response.status_code)
