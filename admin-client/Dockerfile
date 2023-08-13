FROM node:18-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN yarn build

CMD [ "yarn", "dev" ]