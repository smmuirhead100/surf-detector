import requests
from datetime import datetime
from datetime import timedelta
import sys, os
from dotenv import load_dotenv
load_dotenv()
sys.path.append('../../data/src/db')
from db_methods import Database

class HistoricalData:
    def __init__(self, spotId, days, intervalHours, start, accessToken):
        self.spotId = spotId
        self.days = days
        self.intervalHours = intervalHours
        self.start = start
        self.accessToken = accessToken
        self.allData = []
    
    def retrieveData(self):
        url = f"{os.environ.get('BASE_URL')}spotId={self.spotId}&days={self.days}&intervalHours={self.intervalHours}&start={self.start}&cacheEnabled=true&units%5BswellHeight%5D=FT&units%5BwaveHeight%5D=FT&accesstoken={self.accessToken}"
        print(f"retrieving data from {self.start}")
        try:
            response = requests.get(url)
            
            if response.status_code == 200:
                data = response.json()
                for window in data["data"]["wave"]:
                    self.allData.append(window)
            else:
                print(f"Failed to retrieve data. Status code: {response.status_code}")
                return None
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            return None
        
    def addToDb(self):
        db = Database('local')
        
        try:
            for obj in self.allData:
                timestamp = obj.get('timestamp')
                if timestamp:
                    # Check if the timestamp already exists in the table
                    count = db.customQueryFetch(f"SELECT COUNT(*) FROM historical_surf.surf_conditions WHERE timestamp = '{timestamp}'")
                    count = count[0][0]  # Extract the count value
                    # Insert the data into the table
                    if count == 0:
                        db.customQuery(f"INSERT INTO historical_surf.surf_conditions (timestamp, probability, utc_offset, surf_min, surf_max, optimal_score, plus, human_relation, raw_min, raw_max, power) "
                                    f"VALUES ('{timestamp}', {1}, {obj['utcOffset']}, {obj['surf']['min']}, {obj['surf']['max']}, {obj['surf']['optimalScore']}, {obj['surf']['plus']}, '{obj['surf']['humanRelation']}', {obj['surf']['raw']['min']}, {obj['surf']['raw']['max']}, {obj['power']});")
                        
                if timestamp: 
                    count = db.customQueryFetch(f"SELECT COUNT(*) FROM historical_surf.swells WHERE timestamp = '{timestamp}'")
                    count = count[0][0]  # Extract the count value
                    
                    if count == 0:
                        swell_data = obj.get('swells')
                        swell_values = []
                        for swell in swell_data:
                            if swell['height'] > 0: # Sometimes there were excess data with all zero's, this eliminates that because they were always tagged at the end of the array. 
                                swell_values.append(f"({timestamp}, {swell['height']}, {swell['period']}, {swell['impact']}, {swell['power']}, {swell['direction']}, {swell['directionMin']}, {swell['optimalScore']})")
                                
                        for values in swell_values:
                                db.customQuery(f"INSERT INTO historical_surf.swells (timestamp, height, period, impact, power, direction, directionMin, optimalScore) "
                                            f"VALUES {values};")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            db.close()

        
    def collectSwellData(self):
        # Calculate the date range
        end_date = datetime.now()
        start_date = datetime.strptime(self.start, '%Y-%m-%d')

        # Iterate over each day in the range
        current_date = start_date
        while current_date <= end_date:
            formatted_date = current_date.strftime('%Y-%m-%d')
            self.start = formatted_date  # Update the start date
            self.retrieveData()  # Retrieve data using the updated start date
            current_date += timedelta(days=self.days)
        return self.allData

# Create an instance of HistoricalData and retrieve data
historical_data = HistoricalData(
    spotId='5842041f4e65fad6a77088ea',
    days=16,
    intervalHours=1,
    start='2020-01-01',
    accessToken=os.environ.get('ACCESS_TOKEN')
)

historical_data.retrieveData()
historical_data.collectSwellData()
historical_data.addToDb()

