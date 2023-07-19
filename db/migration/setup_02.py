import sys
sys.path.append('../')
from db_methods import Database
from schema.schema import BuoySchema

# Update current DB to use current schema.
def update(): 
    db = Database('local')
    buoySchema = BuoySchema(db)
    buoySchema.addTypes()
    buoySchema.addTables()
    
update()