# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

RUN apt-get update && apt-get install -y \
    libpq-dev \
    build-essential
RUN apt-get install -y python3
RUN apt-get install -y python3-pip

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "../home/app.py", "app.main:app", "--host", "0.0.0.0"]