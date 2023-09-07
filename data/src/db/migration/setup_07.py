import sys
sys.path.append('../')
from db_methods import Database

db = Database('supabase')

db.customQuery("""
DROP SCHEMA IF EXISTS gfs_stations CASCADE;

CREATE SCHEMA IF NOT EXISTS gfs_stations;

SET search_path TO gfs_stations, public;

CREATE TABLE IF NOT EXISTS gfs_stations.buoy (
    id SERIAL PRIMARY KEY,
    timestamp NUMERIC,
    buoyid TEXT,
    UNIQUE (timestamp, buoyid)
);

CREATE TABLE IF NOT EXISTS gfs_stations.swell (
    id SERIAL PRIMARY KEY,
    main_id INT REFERENCES gfs_stations.buoy(id),
    height DECIMAL,
    period DECIMAL,
    direction DECIMAL
);
               """)


db.close()