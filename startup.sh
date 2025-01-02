#!/bin/bash

# sudo systemctl start docker
docker start dev-phpmyadmin
docker start dev-mysql

cd client
pnpm dev &

cd ../api
node --watch index.js