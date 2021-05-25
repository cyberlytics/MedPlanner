#!/bin/bash
docker run -p 4220:4220 -p 9876:9876 -v ${PWD}/med-planner:/angular --name MedPlannerTester -t -i --rm ng:10.0 npm test
