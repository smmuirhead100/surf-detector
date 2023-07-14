from db_methods import Database
# Establishes types of data for the database

class SurflineTypes:
    def __init__(self, db) -> None:
        self.db = db
    
    def execute(self) -> bool:
        self.db.createType("tides", "timestamp VARCHAR(255), height INT")