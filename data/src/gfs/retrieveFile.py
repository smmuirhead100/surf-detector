import os
import requests
from datetime import datetime

def retrieveFile():
    # Get the current date in the format YYYYMMDD
    current_date = datetime.now().strftime("%Y%m%d")

    # Construct the URL using the current date
    url = f"https://nomads.ncep.noaa.gov/pub/data/nccf/com/gfs/prod/gfs.{current_date}/06/wave/station/gfswave.t06z.bull_tar"

    local_filename = "gfswave.t06z.bull_tar"

    response = requests.get(url)

    if response.status_code == 200:
        with open(local_filename, 'wb') as f:
            f.write(response.content)
        print(f"File '{local_filename}' downloaded successfully.")
    else:
        print("Failed to download the file.")

if __name__ == "__main__":
    retrieveFile()