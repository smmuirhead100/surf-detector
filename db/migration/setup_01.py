import sys
sys.path.append('../')
from db_methods import Database
from schema.db_schema_01 import SurflineSchema

# Update current DB to use current schema.
def update(): 
    db = Database()
    surfSchema = SurflineSchema(db)
    surfSchema.addTypes()
    surfSchema.addTables()
    
update()