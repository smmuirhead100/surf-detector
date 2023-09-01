import time
from datetime import datetime, timedelta

def beginning_of_today_unix():
    # Get the current UTC time
    current_utc_time = datetime.utcnow()

    # Calculate the time difference for PST (8 hours behind UTC)
    pst_time_difference = timedelta(hours=8)

    # Calculate the beginning of today in PST
    beginning_of_today_pst = datetime(current_utc_time.year, current_utc_time.month, current_utc_time.day) - pst_time_difference

    # Convert the datetime object to a Unix timestamp
    beginning_of_today_pst_timestamp = int(time.mktime(beginning_of_today_pst.timetuple()))

    return beginning_of_today_pst_timestamp