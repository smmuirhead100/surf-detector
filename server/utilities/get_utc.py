import time
from datetime import datetime, timedelta

def beginning_of_today_unix():
    # Your offset from GMT in hours. E.g., -7 for GMT-7
    offset_hours = -7
    
    # Current time in GMT
    current_gmt_time = datetime.utcfromtimestamp(time.time())
    
    # Convert to local time
    local_time = current_gmt_time + timedelta(hours=offset_hours)
    
    # Truncate to start of day
    start_of_local_day = local_time.replace(hour=0, minute=0, second=0, microsecond=0)
    
    # Convert back to UNIX timestamp
    start_of_local_day_unix = (start_of_local_day - datetime(1970, 1, 1)).total_seconds() - offset_hours * 3600
    
    return int(start_of_local_day_unix)

print(beginning_of_today_unix())
