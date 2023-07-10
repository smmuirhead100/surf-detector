import AllData
import schedule
import datetime
import time
import sqlite3
import takeScreenshot
import detector

locationID = '46222'
locationName = 'Huntington Beach'

def addToDatabase():
    
    # Obtain Result Object 
    result = AllData.getAllData(locationID, locationName)
    result['id'] = locationID
    result['Name'] = locationName
    takeScreenshot.screenshot()
    result['crowd'] = detector.detect()
    print(result)
    
    
    return None


def main():
    addToDatabase()
    schedule.every().day.at("05:00").do(addToDatabase)
    schedule.every().day.at("06:00").do(addToDatabase)
    schedule.every().day.at("07:00").do(addToDatabase)
    schedule.every().day.at("08:00").do(addToDatabase)
    schedule.every().day.at("09:00").do(addToDatabase)
    schedule.every().day.at("10:00").do(addToDatabase)
    schedule.every().day.at("11:00").do(addToDatabase)
    schedule.every().day.at("12:00").do(addToDatabase)

    while True: 
        schedule.run_pending()
        time.sleep(1)
    
main()
