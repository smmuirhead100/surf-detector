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
    
    def addTypes(self) -> bool:
        
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
    
    def addTables(self) -> bool:
        
        # Create tables
        self.db.createTable("Tides", "data Tide")
        self.db.createTable("Waves", "data Wave")
        self.db.createTable("Winds", "data Wind")
        self.db.createTable("Weather", "data Weather")
        self.db.createTable("Ratings", "data Rating")
        
        # For testing purposes
        return True
    
    def test_rating_type(self):
        # Create a new Rating object
        rating = {
            "timestamp": 1631232000,
            "utcOffset": -25200,
            "rating": {
                "key": "overall",
                "value": 4
            }
        }

        # Insert the Rating object into the database
        self.db.insert("Ratings", rating)

        # Retrieve the Rating object from the database
        result = self.db.getTable("Ratings", ["timestamp", "utcOffset", "rating"], "timestamp = 1631232000")
        print(result)

        # Verify that the retrieved Rating object matches the original Rating object
        self.assertEqual(result[0]["timestamp"], rating["timestamp"])
        self.assertEqual(result[0]["utcOffset"], rating["utcOffset"])
        self.assertEqual(result[0]["rating"]["key"], rating["rating"]["key"])
        self.assertEqual(result[0]["rating"]["value"], rating["rating"]["value"])
        
db = Database()
config = SurflineTypes(db)
config.addTypes()
config.addTables()
config.test_rating_type()
        