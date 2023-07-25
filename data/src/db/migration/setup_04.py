import sys
sys.path.append('../')
from db_methods import Database

# Update current DB to use current schema.
def update(): 
    db = Database('vercel')
    # Add name spotName to crowd table
    db.customQuery('ALTER TABLE tide ADD COLUMN spotid VARCHAR(255);')
    db.close()
update()