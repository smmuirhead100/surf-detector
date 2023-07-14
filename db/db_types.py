from db_methods import Database

"""
Establishes the organization needed for the database.  This includes defining types and creating tables.

Example:
    db = Database()
    addTypes = SurflineTypes(db)
"""

class SurflineTypes:
    def __init__(self, db) -> None:
        self.db = db
    
    def executeTypes(self) -> bool:
        
        # Tide type
        self.db.createType("Tide", """
                                    timestamp INT, 
                                    utcOffset INT,
                                    type String,
                                    height FLOAT
                           """)
        
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
                                    humanRelation STRING,
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
        
        # Wave type
        self.db.createType("Wave", """
                                    timestamp INT,
                                    probability FLOAT NULL,
                                    utcOffset INT,
                                    surf Surf,
                                    power FLOAT,
                                    swells Swell[]
                            """)
        
        # Wind type
        self.db.createType("Wind", """
                                    timestamp INT,
                                    utcOffset INT,
                                    speed FLOAT,
                                    direction FLOAT,
                                    directionType STRING,
                                    gust FLOAT,
                                    optimalScore INT
                           """)
        
        # Weather type
        self.db.createType("Weather", """
                                    timestamp INT,
                                    utcOffset INT,
                                    temperature FLOAT,
                                    condition STRING,
                                    pressure FLOAT
                           """)
        
        # SubRating type
        self.db.createType("SubRating", """
                                    key STRING,
                                    value INT
                           """)
        
        # Rating type
        self.db.createType("Rating", """
                                    timestamp INT,
                                    utcOffset INT,
                                    rating SubRating
                           """)
        
        # For testing purposes
        return True
    
    def executeTables(self) -> bool:
        
        # Create tables
        self.db.createTable("Tides", "Tide")
        self.db.createTable("Waves", "Wave")
        self.db.createTable("Winds", "Wind")
        self.db.createTable("Weather", "Weather")
        self.db.createTable("Ratings", "Rating")
        
        # For testing purposes
        return True
        