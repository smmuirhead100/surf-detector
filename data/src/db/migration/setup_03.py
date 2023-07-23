import sys
sys.path.append('../')
from db_methods import Database

# Update current DB to use current schema.
def update(): 
    db = Database('supabase')
    # Add name spotName to crowd table
    db.customQuery('ALTER TABLE crowd ADD COLUMN spotName VARCHAR(255);')
    db.close()
update()