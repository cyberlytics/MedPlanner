#!/bin/bash

# folder existence check is not required as the repository has to be completely cloned
cd ngMedPlanner

# build frontend image
sh build.sh

# ensure installation of missing libraries
sh setup.sh

cd ..
# start project
docker-compose up