FROM node:18-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm ci --only=production

RUN npm install

USER node

COPY --chown=node:node ./src .

EXPOSE 3000

CMD [ "node" "index.mjs"]