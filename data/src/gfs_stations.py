from gfs.gfsStationParser import GFSStationDataParser

#------------------------------------------------------------------------------------------------------------------#
# This file adds gfs forecast data for just 3 buoy stations. Once supabase is optimized to run faster, will add more / all stations. 
#------------------------------------------------------------------------------------------------------------------#

stations = [46222, 46225, 46026]

main = GFSStationDataParser(stations=stations, db='supabase')
main.parse_and_add_to_db