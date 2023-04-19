FROM node:18.15
WORKDIR /usr/src/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "npm", "start" ]