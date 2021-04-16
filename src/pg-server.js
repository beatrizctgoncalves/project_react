'use strict'

const express = require('express'); //Import the express module
const app = express(); //Create an Express application

const bodyParser = require('body-parser'); //Import the body-parser module 
app.use(bodyParser.json()); //Parse application/json
app.use(bodyParser.urlencoded({extended: true})); //Parse application/x-www-form-urlencoded

const database = require('./pg-database');
const apiGitlab = require('./api-gitlab');
const apiJira = require('./api-jira');
const pgResponses = require('./pg-responses');

const services = require('./pg-services')(database, pgResponses, apiGitlab, apiJira);

const webApi = require('./pg-web-api')(express, services); //Import the web-api
const usersCreator = require('./pg-users')(express, services);

app.use('/api', webApi);
app.use('/users', usersCreator);

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`)); //Listening on port 8080