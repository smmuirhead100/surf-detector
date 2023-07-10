import AllData
import schedule
import datetime
import time
import sqlite3
import takeScreenshot
import detector
import clickBot

locationID = '46222'
locationName = 'Huntington Beach'

# Collects data at current time and adds it to the database
def addToDatabase():
    
    # Obtain Result Object 
    result = AllData.getAllData(locationID, locationName)
    result['id'] = locationID
    result['Name'] = locationName
    
    # Computer vision modules to obtain crowd data:
    
    # 1. ClickBot: Makes sure the cam has not froze, will click to unfreeze if so.
    clickBot.click_image()
    # 2. TakeScreenshot: Takes a screenshot of the current surf cam
    takeScreenshot.screenshot()
    # 3. Detector: Detects the number of surfers in the water
    result['crowd'] = detector.detect()
    
    
    print(result)
    
    return None





# Starts collecting data every 20 seconds. Should only run between hours of 05:00 and 12:00.
def startCollecting(): 
    schedule.every(20).seconds.do(addToDatabase)
    
    while datetime.datetime.now().hour < 15:
        schedule.run_pending()
        time.sleep(1)
    
    
    
    
    
    
# Runs all the time, collecting data.
def main():
    startCollecting()
    schedule.every().day.at('05:00').do(startCollecting)
    
    while True: 
        schedule.run_pending()
        time.sleep(1)
    
main()
