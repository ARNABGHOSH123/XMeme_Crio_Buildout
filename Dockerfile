FROM node:14
WORKDIR /xmeme_docker_server
COPY /server/package*.json /xmeme_docker_server
RUN npm install
COPY /server /xmeme_docker_server
EXPOSE 8081
CMD ["npm","start"]