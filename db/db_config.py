from db_methods import Database
import unittest

"""
Establishes the organization needed for the database.  This includes defining types and creating tables.

Example:
    db = Database()
    surfTable = SurflineTypes(db)
    surfTable.addTypes()
    surfTable.addTables()
    
"""

class SurflineTypes:
    def __init__(self, db) -> None:
        self.db = db
    
    def addTypes(self) -> bool:
        
        # RawSurf type
        self.db.createType("RawSurf", """
                                    min FLOAT,
                                    max FLOAT
                           """)
        
        # Surf type
        self.db.createType("Surf", """
                                    min INT,
                                    max INT,
                                    optimalScore INT,
                                    plus BOOLEAN,
                                    humanRelation TEXT,
                                    raw RawSurf
                           """)
        
        # Swell type
        self.db.createType("Swell", """
                                    height FLOAT,
                                    period FLOAT,
                                    impact FLOAT,
                                    power FLOAT,
                                    direction FLOAT,
                                    directionMin FLOAT,
                                    optimalScore INT
                           """)
        
        # SubRating type
        self.db.createType("SubRating", """
                                    key TEXT,
                                    value INT
                           """)
        
        # For testing purposes
        return True
    
    def addTables(self) -> bool:
        
    
        # Create tables
        self.db.createTable("Tide", "timestamp INT, utcOffset INT, type TEXT, height FLOAT")
        self.db.createTable("Wave", "timestamp INT, probability FLOAT, utcOffset INT, surf Surf, power FLOAT, swell Swell")
        self.db.createTable("Wind", "timestamp INT, utcOffset INT, speed FLOAT, direction FLOAT, directionType TEXT, gust FLOAT, optimalScore INT")
        self.db.createTable("Weather", "timestamp INT, utcOffset INT, temperature FLOAT, condition TEXT, pressure FLOAT")
        self.db.createTable("Rating", "timestamp INT, utcOffset INT, rating SubRating")
        
        # For testing purposes
        return True
    