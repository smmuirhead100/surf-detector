import sys
sys.path.append('../')
from db_methods import Database

db = Database('local')

db.customQuery("""

DROP SCHEMA historical_surf CASCADE;

               """)


db.close()