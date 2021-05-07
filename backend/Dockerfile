# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

COPY requirements.txt requirements.txt
COPY .  .

RUN pip3 install -r requirements.txt

CMD [ "python", "../home/app.py", "app.main:app", "--host", "0.0.0.0"]