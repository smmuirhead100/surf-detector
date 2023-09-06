import sys
sys.path.append('../')
from db_methods import Database

db = Database('local')

db.customQuery("""
DROP SCHEMA IF EXISTS historical_buoy CASCADE;

CREATE SCHEMA IF NOT EXISTS historical_buoy;

SET search_path TO historical_buoy, public;

CREATE TABLE IF NOT EXISTS historical_buoy.buoy (
    id SERIAL PRIMARY KEY,
    timestamp NUMERIC,
    buoyid TEXT,
    UNIQUE (timestamp, buoyid)
);

CREATE TABLE IF NOT EXISTS historical_buoy.swell (
    id SERIAL PRIMARY KEY,
    main_id INT REFERENCES historical_buoy.buoy(id),
    height DECIMAL,
    period DECIMAL,
    direction DECIMAL
);
               """)


db.close()