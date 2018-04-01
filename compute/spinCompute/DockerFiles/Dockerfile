
FROM ubuntu:16.04

RUN apt-get update && apt-get install

RUN mkdir spin && cd ./spin

COPY . .

RUN chmod 777 ./installCurl.sh
RUN chmod 777 ./startSpin.sh
RUN chmod 777 ./startFn.sh
RUN chmod 777 ./startHandler.sh
RUN chmod 777 ./installDockerFn.sh


RUN ./installCurl.sh
RUN ./installDockerFn.sh
CMD ./startHandler.sh
