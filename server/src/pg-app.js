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

    const apiGitlab = require('./apis/api-Gitlab')(requests, pgResponses);
    const apiJira = require('./apis/api-Jira')(requests, pgResponses);
    const authizationConfig = require('./database/authization-dg-config/config')
    const pgScores = require('./services/pg-scores')(databaseGroups, databaseUsers, requests, pgResponses);

    try {
        let authization = await require('@authization/authization').setup({app,db:authizationConfig.dbConfigs,rbac_opts:authizationConfig.rbac_opts});
        const servicesGroups = require('./services/pg-services-groups')(databaseGroups,databaseUsers, pgResponses, pgScores, apiGitlab, apiJira, requests);
        const servicesUsers = require('./services/pg-services-users')(databaseUsers, pgResponses, authization);
    
        const webApi = require('./model/pg-web-api')(express, servicesGroups, pgScores ,aux); //Import the web-api
        const usersCreator = require('./model/pg-users')(express, servicesUsers, aux, authization);
        
        app.use(pgResponses.index.api, webApi);
        app.use(pgResponses.index.users, usersCreator);
             
    } catch (error) {
        console.log(" ERRO DE SETUP")
        console.log(error);
    }

    return app
}