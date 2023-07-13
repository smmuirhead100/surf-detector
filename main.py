import data_fetching.AllData as AllData
import schedule
import datetime
import time
import sqlite3
import data_fetching.bots.takeScreenshot as takeScreenshot
import data_fetching.bots.detector as detector
import data_fetching.bots.clickBot as clickBot

locationID = '46222'
locationName = 'Huntington Beach'





# Collects data at current time and adds it to the database.
def addToDatabase():
    
    # Obtain Result Object 
    result = AllData.getAllData(locationID, locationName)
    result['locationID'] = locationID
    result['Name'] = locationName
    
    # Computer vision modules to obtain crowd data:
    
    clickBot.click_image() # 1. ClickBot: Makes sure the cam has not froze, will click to unfreeze if so.
    time.sleep(2) # 2. Sleep for 2 seconds to allow the image to unfreeze
    takeScreenshot.screenshot()  # 3. TakeScreenshot: Takes a screenshot of the current surf cam
    result['crowd'] = detector.detect()  # 4. Detector: Detects the number of surfers in the water
    
    
    print(result)
    
    return None





# Starts collecting data every 20 seconds. Should only run between hours of 05:00 and 12:00.
def startCollecting(): 
    schedule.every(20).seconds.do(addToDatabase)
    
    while datetime.datetime.now().hour < 13:
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
