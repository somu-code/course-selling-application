#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.10.0/bin

git pull origin main
cd server
pm2 kill
npm install
pm2 start ./src/index.mjs
