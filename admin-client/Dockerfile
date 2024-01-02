FROM node:20-bookworm as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.25-alpine-perl

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build usr/src/app/dist/ /usr/src/nginx/html

EXPOSE 8080
