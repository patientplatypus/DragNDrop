FROM gradle:alpine
USER root
EXPOSE 4000
RUN echo 'now listening on port 4000'

COPY . .
RUN gradle build
CMD gradle run
