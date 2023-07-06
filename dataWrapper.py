from inputData import AllData


def addToDatabase(locationID, locationName):
    print(AllData.getAllData(locationID, locationName))
    return None

addToDatabase('46222', 'Huntington Beach, CA')

