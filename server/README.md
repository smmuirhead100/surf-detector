Server for backend. Should fetch data from database and return to api requests. Currently running on flask, deployed on Digital Ocean. 

SETUP: 
> python3 0m venv flask_env
> source flask_env/bin/activate
> pip install -r requirements.txt
> python3 -m flask --app server run

Deployment on Digital Ocean:
1. Connect GitHub repo to Digital Ocean
2. Configure gunicorn_config.py, requirements.txt, and application.py
3. Add repo to Digital Ocean build
4. Make sure to add command 'cd server' to build, as we are in the server directory
5. Deploy!