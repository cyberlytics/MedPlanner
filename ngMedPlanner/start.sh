#!/bin/bash
docker run -p 4220:4220 -v ${PWD}/med-planner:/angular --env theport=4220 --name MedPlanner -t -i --rm ng:10.0 npm start
