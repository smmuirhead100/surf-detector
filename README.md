### Open Source Surf Report

## TODO (Backend)
- [x] Implement object detection model that can detect how many surfers are in water.
- [x] Configure cloud db (CockroachDB, Supabase)
- [x] Fetch swell and weather data from NOAA and relative databases, given specific location.
- [x] Define db methods. 
- [x] Add NOAA buoy data (SCRIPPS) to the db.
- [x] Deploy scheduled tasks using AWS ECS and ECR. 
- [ ] Grab historical NOAA and SL data to train prediction models more quickly. 
- [ ] Create AI forecast using GPT API (3 day forecast and 14 day forecast).
- [ ] Configure data collection from bouys other than SCRIPPS.
- [ ] Train crowd prediction model. 
- [ ] Train swell prediction model. 
- [ ] Update root README for developer setup. 

## TODO (Frontend)
- [x] Add chart to represent wave height.
- [x] Chart to represent tides and current crowd.
- [ ] Add point to tide chart showing current time.
- [ ] Style tide chart to better represent mouse hover position. 
- [x] Add Icons to navbar.
- [ ] Update root README for developer setup. 