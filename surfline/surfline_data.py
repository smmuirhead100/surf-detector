import requests
from utilities.timestamp import unixToHuman





# Returns array of tuples (timestamp, height), with high tide and low tides for the next 3 days. 

def getTides(spotId : str) -> list:

    res = requests.get('https://services.surfline.com/kbyg/spots/forecasts/?spotId=' + spotId)

    res = res.json()

    res = (res['data']['tides'])

    tides = []

    for tide in res:
        if tide['type'] == 'HIGH' or tide['type'] == 'LOW':
            tides.append((unixToHuman(tide['timestamp']), tide['height']))

    return tides

print(getTides('5842041f4e65fad6a7708a7a'))