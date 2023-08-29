import sys
sys.path.append('../')
from db_methods import Database

db = Database('local')

db.customQuery("""

CREATE SCHEMA IF NOT EXISTS historical_surf;

-- Set the search path to include the surf_data schema
SET search_path TO historical_surf, public;
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'swell') THEN
        CREATE TYPE historical_surf.swell AS (
            height numeric,
            period integer,
            impact numeric,
            power numeric,
            direction numeric,
            direction_min numeric,
            optimal_score integer
        );
    END IF;
END $$;

-- Create the main table for surf data
CREATE TABLE IF NOT EXISTS historical_surf.surf_conditions (
    timestamp integer,
    probability numeric,
    utc_offset integer,
    surf_min numeric,
    surf_max numeric,
    optimal_score numeric,
    plus boolean,
    human_relation text,
    raw_min numeric,
    raw_max numeric,
    power numeric,
    PRIMARY KEY (timestamp)
);

-- Create the main table for surf data
CREATE TABLE IF NOT EXISTS historical_surf.swells (
    timestamp integer REFERENCES historical_surf.surf_conditions,
    height decimal,
    period decimal,
    impact decimal,
    power decimal,
    direction decimal,
    directionMin decimal,
    optimalScore integer
);
               """)


db.close()