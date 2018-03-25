#!/bin/bash

# echo "Welcome to DragnDropInfra"
# echo "installing dependencies for FRONTEND:"
# cd ./frontend
# npm install
# echo "installing dependencies for MAIN:"
# cd ../main
# npm install
# echo "installing dependencies for COMPUTE:"
# cd ../compute
# npm install
# echo "installing dependencies for LOADBALANCER:"
# cd ../loadbalancer
# npm install
# echo "and DOCKER-COMPOSE UP:"
# docker-compose up --build


docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi $(docker images -q)
docker-compose up --build
