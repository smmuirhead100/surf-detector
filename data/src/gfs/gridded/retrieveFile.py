import os
import requests
from datetime import datetime

def retrieveFile():
    # Get the current date in the format YYYYMMDD
    current_date = datetime.now().strftime("%Y%m%d")

    # Construct the URL using the current date
    url = f"https://nomads.ncep.noaa.gov/pub/data/nccf/com/gfs/prod/gfs.{current_date}/12/wave/gridded/gfswave.t12z.wcoast.0p16.f384.grib2"
    local_filename = "gfswave.t12z.wcoast.0p16.f069.grib2"

    if os.path.exists(local_filename):
        os.remove(local_filename)  # Remove the existing file

    response = requests.get(url)

    if response.status_code == 200:
        with open(local_filename, 'wb') as f:
            f.write(response.content)
        print(f"File '{local_filename}' downloaded successfully.")
    else:
        print("Failed to download the file.")

if __name__ == "__main__":
    retrieveFile()