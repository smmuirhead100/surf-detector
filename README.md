# Open Source Surf Report

## Developer Setup (Backend)
### Disclaimer: You're likely going to need some env variables to get things running correctly. Feel free to contact me at smmuirhead100@berkeley.edu and I'd be more than happy to help you get setup. 

1. Fork the repo.
2. Clone the forked repo:
    ```git clone git@github.com:<your_github_username>/surf-detector.git```
3. Enter correct directory: 
    ```cd surf-detector```
4. Choose what to work on: 
   ```cd data``` OR ```cd models``` OR ```cd server```
5. Follow instructions below depending on what section your working on. 

### Data
6. Create a virtual environment: 
    ```python -m venv env```
7. Install Requirements: 
    ```pip install -r requirements.txt```
8. cd into source directory and run: 
    ```cd src``` AND ```python main.py```

### Models 
6. No developer setup needed yet. 

### Server
6. Create a virtual environment: 
    ```python -m venv env```
7. Install Requirements: 
    ```pip install -r requirements.txt```
8. Run locally: 
    ```flask run```


## Developer Setup (Frontend)
### Disclaimer: You're likely going to need some env variables to get things running correctly. Feel free to contact me at smmuirhead100@berkeley.edu and I'd be more than happy to help you get setup. 
1. Fork the repo.
2. Clone the forked repo:
    ```git clone git@github.com:<your_github_username>/surf-detector.git```
3. Enter correct directory: 
    ```cd surf-detector``` AND ```cd frontend``` AND ```cd app```
4. Install Requirements: 
    ```npm install```
5. Run locally: 
    ```npm run dev```

## TODO (Backend)
- [x] Implement object detection model that can detect how many surfers are in water.
- [x] Configure cloud db (CockroachDB, Supabase)
- [x] Fetch swell and weather data from NOAA and relative databases, given specific location.
- [x] Define db methods. 
- [x] Add NOAA buoy data (SCRIPPS) to the db.
- [x] Deploy scheduled tasks using AWS ECS and ECR. 
- [x] Grab historical NOAA and SL data to train prediction models more quickly. 
- [ ] Create AI forecast using GPT API (3 day forecast and 14 day forecast).
- [ ] Configure data collection from bouys other than SCRIPPS.
- [ ] Train crowd prediction model. 
- [x] Train height prediction model. (given actual buoy reading, predict wave height)
- [ ] Train buoy prediction model (given gfs reading, predict actual buoy reading)
- [x] Update root README for developer setup. 
- [x] Add cam URL dictionary to .env.
- [ ] Adding data for every spot appears to not work on AWS ECS. Figure out a different way.
- [ ] Configure a local setup that works without the need for env variables.

## TODO (Frontend)
- [x] Add chart to represent wave height.
- [x] Chart to represent tides and current crowd.
- [x] Add point to tide chart showing current time.
- [x] Style tide chart to better represent mouse hover position. 
- [x] Add Icons to navbar.
- [x] Update root README for developer setup. 
- [x] Handle Mobile Web Version for spot forecast.
- [x] Landing Page
- [ ] Supabase confirmation link page. 
- [x] Fix bug where swell chart renders multiple times. Usually occurs when spot is spam clicked.
- [x] Find a way to create custom scroll bar for day forecasts.
- [x] Set minimum of tide chart to -1.5 OR to the calculated minimum of all the possible datapoints (As was the height of swell chart).
- [ ] Make mobile Compatible
- [x] Box that shows current tide is not centering text vertically. 
- [ ] Change style of nabvbar on mobile screens (design is on figma).
- [ ] Migrate vanilla css to Tailwind (low priority).
- [ ] Configure a local setup that works without the need for env variables.
- [ ] Make Home page footer work
- [ ] Home page login on hover should be pointer