'use strict'

module.exports = async function() {
    const express = require('express'); //Import the express module
    const app = express(); //Create an Express application
    const cors = require("cors");

    const bodyParser = require('body-parser'); //Import the body-parser module 
    app.use(bodyParser.json()); //Parse application/json
    app.use(bodyParser.urlencoded({extended: true})); //Parse application/x-www-form-urlencoded
    app.use(cors());

    const fetch = require('node-fetch');
    const pgResponses = require('./services/pg-responses');
    const aux = require('./model/pg-promises');

    const requests = require('./services/apis-db-requests')(fetch, pgResponses);
    const databaseGroups = require('./database/pg-database-groups')(requests, pgResponses);
    const databaseUsers = require('./database/pg-database-users')(requests, pgResponses);

    const apiGitlab = require('./apis/api-gitlab')(requests, pgResponses);
    const apiJira = require('./apis/api-jira')(requests, pgResponses);
    const pgScores = require('./services/pg-scores')(databaseGroups, databaseUsers, pgResponses);

    const dbConfigs = {
        "host":'localhost',
        "port": 5432,
        "user":'postgres',
        "password":'1234',
        "connectionLimit": 5,
        "database":'plug',
        "dbms": 'postgres'
    }
    
    let authization = await require('@authization/authization').setup({app,db:dbConfigs});

    const servicesGroups = require('./services/pg-services-groups')(databaseGroups, pgResponses, pgScores, apiGitlab, apiJira);
    const servicesUsers = require('./services/pg-services-users')(databaseUsers, pgResponses, authization);

    const webApi = require('./model/pg-web-api')(express, servicesGroups, aux); //Import the web-api
    const usersCreator = require('./model/pg-users')(express, servicesUsers, aux);
    
    app.use(pgResponses.index.api, webApi);
    app.use(pgResponses.index.users, usersCreator);

    return app
}