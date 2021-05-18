# start from base
FROM ubuntu:18.04

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

WORKDIR /app

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 5000
CMD [ "python", "./app.py" ]