import datetime

# Converts a Unix timestamp to human-readable format. 
# Ex. 1609459200 -> 2021-01-01 00:00:00

def unixToHuman(timestamp : int) -> str:

    # Convert the timestamp to a datetime object.
    datetime_object = datetime.datetime.fromtimestamp(timestamp)

    # Format the datetime object as a string
    formatted_date = datetime_object.strftime("%Y-%m-%d %H:%M:%S")

    return formatted_date
