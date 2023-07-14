from db_methods import Database

"""
Establishes types of data for the database

Example:
    db = Database()
    addTypes = SurflineTypes(db)
"""

class SurflineTypes:
    def __init__(self, db) -> None:
        self.db = db
    
    def execute(self) -> bool:
        
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