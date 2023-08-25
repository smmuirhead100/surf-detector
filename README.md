# Open Source Surf Report

## Developer Setup (Backend)
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
- [ ] Grab historical NOAA and SL data to train prediction models more quickly. 
- [ ] Create AI forecast using GPT API (3 day forecast and 14 day forecast).
- [ ] Configure data collection from bouys other than SCRIPPS.
- [ ] Train crowd prediction model. 
- [ ] Train swell prediction model. 
- [x] Update root README for developer setup. 

## TODO (Frontend)
- [x] Add chart to represent wave height.
- [x] Chart to represent tides and current crowd.
- [ ] Add point to tide chart showing current time.
- [x] Style tide chart to better represent mouse hover position. 
- [x] Add Icons to navbar.
- [x] Update root README for developer setup. 
- [ ] Handle Mobile Web Version for spot forecast.
- [x] Landing Page
- [ ] Supabase confirmation link page.
- [ ] Fix bug where swell chart renders multiple times. Usually occurs when spot is spam clicked.
- [ ] Find a way to create custom scroll bar for day forecasts.
- [ ] Make mobile Compatible