import requests
import datetime, timedelta

class HistoricalData:
    def __init__(self, spotId, days, intervalHours, start, accessToken):
        self.spotId = spotId
        self.days = days
        self.intervalHours = intervalHours
        self.start = start
        self.accessToken = accessToken
        self.allData = []
    
    def retrieveData(self):
        url = f"https://services.surfline.com/kbyg/spots/forecasts/wave?spotId={self.spotId}&days={self.days}&intervalHours={self.intervalHours}&start={self.start}&cacheEnabled=true&units%5BswellHeight%5D=FT&units%5BwaveHeight%5D=FT&accesstoken={self.accessToken}"
        print(url)
        try:
            response = requests.get(url)
            
            if response.status_code == 200:
                data = response.json()
                return data
            else:
                print(f"Failed to retrieve data. Status code: {response.status_code}")
                return None
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")
            return None
        
    def saveSwellData(self, obj):
        for window in obj["data"]["wave"]:
            self.allData.append(window)
        
    def collectSwellData(self):
        # Calculate the date range
        end_date = datetime.now()
        start_date = end_date - timedelta(days=16)

        # Iterate over each day in the range
        current_date = start_date
        while current_date <= end_date:
            formatted_date = current_date.strftime('%Y-%m-%d')
            data = self.retrieveData(formatted_date)
            self.saveSwellData(data)
            current_date += timedelta(days=1)

# Create an instance of HistoricalData and retrieve data
historical_data = HistoricalData(
    spotId='5842041f4e65fad6a77088ea',
    days=16,
    intervalHours=1,
    start='2020-08-01',
    accessToken='0eca8312f8ff88f3d828286d695167e5a93d0bb9'
)
data = historical_data.retrieveData()

if data:
    print("Retrieved data:")
    
print(historical_data.saveSwellData(data))
