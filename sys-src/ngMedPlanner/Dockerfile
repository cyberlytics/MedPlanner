FROM node:lts-alpine
WORKDIR /angular
RUN npm install -g @angular/cli
#RUN npm install typescript --save-dev
ENV theport=4220
EXPOSE ${theport}

#docker run -p 4220:4220 -v ${PWD}:/angular --env theport=4220 --name MedPlannerStandAlone -t -i --rm ng:10.0 /bin/ash
#docker run -p 4220:4220 -v ${PWD}:/angular --env theport=4220 --name MedPlannerStandAlone -t -i --rm ng:10.0 ng serve --host 0.0.0.0
#ng serve --host 0.0.0.0 --port 4220

