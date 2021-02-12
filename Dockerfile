FROM node:14-alpine
WORKDIR /xmeme_docker_server
COPY /server/package*.json /xmeme_docker_server/
RUN npm install
COPY /server /xmeme_docker_server
EXPOSE 8081
EXPOSE 8080
CMD ["npm","start"]