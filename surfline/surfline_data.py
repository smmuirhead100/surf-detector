import requests

# Get http response from example surf spot. 

res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/?spotId=590927576a2e4300134fbed8')

res = res.json()

res = (res['data']['tides'])

for tide in res:
    if tide['type'] == 'HIGH' or tide['type'] == 'LOW':
        print(tide['height'])
        print(tide['timestamp'])
