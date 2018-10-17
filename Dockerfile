FROM node

WORKDIR /app

RUN npm install nodemon -g

COPY package.json /app/package.json

RUN npm install

COPY /bin/www /app/bin

EXPOSE 3000
