# Getting Started with XMeme

This is a meme stream application where users can create memes with image urls,name and caption.
After posting a meme they are allowed to change either url/caption or both.Users can watch all the
latest 100 memes in latest first order.They can even like a meme. Play with it and enjoy. :).

## Technical stack

Front-end stack:

- ReactJS,Material UI,bootstrap,html,css and js.

Back-end stack:

- NodeJS and ExpressJS

Database:

- MongoDB NoSql DB.

### Production

Front-end:
https://xmeme-arnab-frontend.netlify.app

Back-end:
https://xmeme-backend-iqy0.onrender.com

Application may take one or two reloads before starting . They are deployed on Heroku.

### Developments

Front-end runs at:
http://localhost:3000/

Back-end runs at:
http://localhost:8081/

Swagger-UI runs at:
http://localhost:8080/swagger-ui/

### Application Demo

https://drive.google.com/file/d/1OnqLhpul1l3owk0GNAW8gOyF-NLx8Hi1/view

### Start front end

cd to the client folder and do:
npm start

This will start the development server at port 3000.

### Start back end

cd to the server folder and do:
npm start

This will start the back-end server at port 8081 and swagger-ui at port 8080.

MongoDB connection string specify dbname:- https://stackoverflow.com/questions/63224330/where-do-i-find-my-dbname-for-mongodb-connection-string

### API requests

1. Get all memes - /memes (GET)
2. Get meme by id - /memes/<id> (GET)
3. Post a meme - /memes (POST)
4. Patch a meme (update) - /memes/<id> (PATCH)

All the request validation have been added in api_config/RequestValidator.js
Response Mappers have been added in api_config/ResponseMapper.js

### install.sh

This file contains all the commands to install the required dependencies for the backend.

### server_run.sh

This file contains all the commands to make the server up and running

### sleep.sh

This file has a single command to wait for 60 seconds for the server to come in working condition
