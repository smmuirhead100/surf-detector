import os
import requests
from datetime import datetime

def retrieveFile():
    # Get the current date in the format YYYYMMDD
    current_date = datetime.now().strftime("%Y%m%d")
    
    # Get the current hour in GMT
    current_hour = datetime.now().hour

    # Determine the closest available hour (0, 6, 12, or 18)
    if current_hour < 6:
        hour = 0
    elif current_hour < 12:
        hour = 6
    elif current_hour < 18:
        hour = 12
    else:
        hour = 18

    # Construct the URL using the current date and hour
    url = f"https://nomads.ncep.noaa.gov/pub/data/nccf/com/gfs/prod/gfs.{current_date}/{hour}/wave/station/gfswave.t{hour}z.bull_tar"
    local_filename = f"gfswave.t{hour}z.bull_tar"

    if os.path.exists(local_filename):
        os.remove(local_filename)  # Remove the existing file

    response = requests.get(url)

    if response.status_code == 200:
        with open(local_filename, 'wb') as f:
            f.write(response.content)
        print(f"File '{local_filename}' downloaded successfully.")
        return local_filename
    else:
        print("Failed to download the file.")
        return None
