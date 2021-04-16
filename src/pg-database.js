'use strict'

const pgResponses = require('./pg-responses');
const fetch = require('node-fetch');

const ES_URL = 'http://localhost:9200/';

var arrayMethods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
}

function makeFetch(uri, method, body) {
    return fetch(`${ES_URL}`.concat(uri)), {
        method: method,
        headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
            'Content-Type': 'application/json'
        },
        body: body //Request body
    }
        .then(response => response.json()) //Expecting json response
}

module.exports = {
    createGroup: function(owner, group_name, group_description, type, project_id) {
        var requestBody = JSON.stringify({
            "owner": owner,
            "name": group_name,
            "description": group_description,
            "members": [],
            "type": type,
            "project_id": project_id
        })
        return makeFetch('groups/_doc', arrayMethods.POST, requestBody)
            .then(body => {
                if(!body.error) return body._id;
                else return pgResponses.setError(pgResponses.DB_ERROR)
            })
    },

    getUserGroups: function(owner) {

    }
}