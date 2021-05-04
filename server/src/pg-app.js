'use strict'

module.exports = async function(){

    const express = require('express'); //Import the express module
const app = express(); //Create an Express application

const bodyParser = require('body-parser'); //Import the body-parser module 
app.use(bodyParser.json()); //Parse application/json
app.use(bodyParser.urlencoded({extended: true})); //Parse application/x-www-form-urlencoded

const database = require('./pg-database');
const apiGitlab = require('./api-gitlab');
const apiJira = require('./api-jira');
const pgResponses = require('./pg-responses');
const pgScores = require('./pg-scores');


const dbConfigs = {
    "host":'localhost',
    "port":5432,
    "user":'postgres',
    "password":'1234',
    "connectionLimit": 5,
    "database":'PS',
    "dbms": 'postgres'
    }
  
    var authization = await require('@authization/authization').setup({app,db:dbConfigs});

const services = require('./pg-services')(database, pgResponses, pgScores, apiGitlab, apiJira);

const webApi = require('./pg-web-api')(express, services,authization); //Import the web-api
const usersCreator = require('./pg-users')(express, services,authization);

app.use('/api', webApi);
app.use('/users', usersCreator);

return app
}