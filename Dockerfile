FROM node:18.15
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build
EXPOSE 8080
CMD [ "node", "server/server.js" ]