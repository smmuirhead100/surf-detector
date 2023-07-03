import requests
from django.http import HttpResponse

# Retrieves real time wave data from NOAA API. 

def noaa_api_view(location):
    url = 'https://www.ndbc.noaa.gov/data/realtime2/' + location + '.spec'
    response = requests.get(url)
    
    if response.status_code == 200:
        # Process the response data
        data = response.text
        
        # Split the data into lines and print the first line
        lines = data.split('\n')
        first_row = lines[2]
        first_row = first_row.split(' ')
        
        print("The buoy is reading a wave height of " + first_row[8] + " meters at " + first_row[9] + " coming from the " + first_row[14] + " (" + first_row[26] + " degrees) direction.")
    
    else:
        # Return an error message
        print('Error: Failed to retrieve data from the NOAA API.', status=response.status_code)

    
noaa_api_view('46222')
