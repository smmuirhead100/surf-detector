import sys
sys.path.append('../')
from db_methods import Database
from schema.schema import SurflineSchema

# Update current DB to use current schema.
def update(): 
    db = Database('local')
    surfSchema = SurflineSchema(db)
    surfSchema.addTypes()
    surfSchema.addTables()
    db.close()
    
update()