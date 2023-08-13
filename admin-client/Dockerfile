FROM node:18-bullseye as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN yarn build

FROM nginx:1-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build usr/src/app/dist /usr/share/nginx/html

CMD [ "yarn", "dev" ]