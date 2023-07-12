import sqlite3
import json

connection = sqlite3.connect("gta.db")
cursor = connection.cursor()

# Create table
cursor.execute("CREATE TABLE IF NOT EXISTS gta (name TEXT, locationID INTEGER, crowd INTEGER, swell TEXT, weather TEXT)")

release_list = [
    {'Swell': {'height': '0.3', 'period': '12.5', 'direction': 'WSW', 'compass': '160'},
     'Weather': {'time': '2023-07-12 15:33', 'temp': 86.0, 'wind': 9.4, 'windDir': 'SW', 'precip': 0.0, 'currCloud': 25},
     'locationID': '46222', 'Name': 'Huntington Beach', 'crowd': 33},
    {'Swell': {'height': '0.6', 'period': '9.8', 'direction': 'NNW', 'compass': '340'},
     'Weather': {'time': '2023-07-12 16:45', 'temp': 82.0, 'wind': 6.2, 'windDir': 'W', 'precip': 0.0, 'currCloud': 10},
     'locationID': '46223', 'Name': 'Malibu', 'crowd': 22},
    {'Swell': {'height': '0.8', 'period': '11.2', 'direction': 'SW', 'compass': '220'},
     'Weather': {'time': '2023-07-12 14:20', 'temp': 88.0, 'wind': 10.1, 'windDir': 'SE', 'precip': 0.0, 'currCloud': 30},
     'locationID': '46224', 'Name': 'Santa Monica', 'crowd': 45}
]

# Insert data
for release in release_list:
    name = release['Name']
    location_id = release['locationID']
    crowd = release['crowd']
    swell = json.dumps(release['Swell'])
    weather = json.dumps(release['Weather'])
    cursor.execute("INSERT INTO gta (name, locationID, crowd, swell, weather) VALUES (?, ?, ?, ?, ?)",
                   (name, location_id, crowd, swell, weather))

# Select rows with period over 10
selected_rows = cursor.execute("SELECT name FROM gta WHERE json_extract(swell, '$.period') > 10")
for row in selected_rows:
    print(row)

connection.close()
