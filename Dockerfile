FROM node:19.2.0

WORKDIR /usr/src/app

ADD package.json package-lock.json /

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]