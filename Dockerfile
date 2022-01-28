FROM node:lts-alpine3.14

ENV NODE_ENV docker_dev

WORKDIR /app

COPY data ./data
COPY config ./config

COPY package.json ./
COPY tsconfig.json ./
RUN npm install

COPY src ./src
RUN npm run build

EXPOSE 4040
CMD [ "node", "./dist/index.js" ]


