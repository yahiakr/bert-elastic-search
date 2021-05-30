# start from base
FROM ubuntu:18.04

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev python3.8 python3-pip

RUN pip3 install --upgrade pip

WORKDIR /app

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

RUN pip3 install -r requirements.txt

COPY . /app

EXPOSE 5000
CMD [ "python3", "./app.py" ]