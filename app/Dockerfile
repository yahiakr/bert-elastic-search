FROM node:12

COPY package.json ./
COPY .env ./

# RUN npm install

COPY . /app
WORKDIR /app

EXPOSE 3000
CMD [ "npm", "run", "start" ]