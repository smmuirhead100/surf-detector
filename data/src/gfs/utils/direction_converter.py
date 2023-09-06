# Simple function to convert NOAA degrees to the appropriate representation

def convert(num):
    ans = num + 180
    if ans > 360:
        return (ans - 360)
    else:
        return ans