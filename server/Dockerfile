#Deriving the latest base image
FROM python:3

#Labels as key value pair
LABEL Maintainer="seanmuirhead"

# Any working directory can be chosen as per choice like '/' or '/home' etc
# i have chosen /usr/app/src
WORKDIR /src

#to COPY the remote file at working directory in container
COPY src/ /src

COPY requirements.txt /src/

#to install the dependencies
RUN pip install -r requirements.txt
# Now the structure looks like this '/usr/app/src/test.py'

ENV PYTHONPATH "${PYTHONPATH}:/src"
#CMD instruction should be used to run the software
#contained by your image, along with any arguments.

CMD [ "python3", "-m flask --app server run"]