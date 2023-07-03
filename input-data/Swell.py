import requests

# Retrieves real time wave data from NOAA API. 

def getSwellData(location):
    url = 'https://www.ndbc.noaa.gov/data/realtime2/' + location + '.spec'
    response = requests.get(url)
    
    if response.status_code == 200:
        # Process the response data
        data = response.text
        returnDict = {}
        
        # Split the data into lines and print the first line
        lines = data.split('\n')
        first_row = lines[2]
        first_row = first_row.split(' ')
        
        # Add relevant data to the return dictionary
        returnDict['height'] = first_row[8]
        returnDict['period'] = first_row[9]
        returnDict['direction'] = first_row[16]
        returnDict['degrees'] = first_row[28]
        
        return returnDict

    else:
        # Return an error message
        print('Error: Failed to retrieve data from the NOAA API.', status=response.status_code)
