/**
 * This is entry point for XMeme Backend Application.
 * The specifications are as follows:-
 * 1) api_config - Contains all the helper functions to create router,request syntax check and response mapping for api configuration and working.
 * 2) models - Contains a single file meme.js which is Mongoose schema for Meme objects.
 * 3) node_modules - Contains all application dependencies
 * 4) routes- Contains all the API Routes.
 * 5) index.js - entrypoint
 * 
 * The application uses NodeJS as backend application and MongoDB as database.
 * Swagger UI has been configured to run at port 8080 and can be accessed at:-
 * http://localhost:8080/swagger-ui/
 * and the backend application at (Local):-
 * http://localhost:8081/
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const {router}  = require('./routes/routes');


const APP_PORT = process.env.APP_PORT_NO || 8081;//default application port for API routes set to 8081
const SWAGGER_PORT = process.env.SWAGGER_UI_PORT_NO || 8080;//default port for Swagger UI routes set to 8080
const app = express();

/**Mongoose connection to MongoDB 
 * Note: For deployment, MongoDB Atlas URI has been used and for testing on AWS EC2, 
 *       the local one is used
*/
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true});

mongoose.connection.once('open',() => {
    console.log('connected to mongodb');
});

//CORS setting required for cross-port communications.
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
//routes configuration for all API routes with the main backend application
app.use('/memes', router);

//Extended: https://swagger.io/specification/
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: 'XMeme API Reference',
            version: '1.0.0',
            description: 'This reference contains the information about APIs used in XMeme',
            contact: {
                email: 'arnabghosh31031998@gmail.com'
            },
            servers: [
                {
                    url: `http://localhost:${APP_PORT}`
                }
            ]
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger-ui',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Application starts listening
app.listen(APP_PORT, () => {
    console.log(`Server listening on port ${APP_PORT}`);
});

//Swagger UI starts listening
app.listen(SWAGGER_PORT, () => {
    console.log(`Swagger ui running on ${SWAGGER_PORT}`);
});