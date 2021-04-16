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
    return fetch(`${ES_URL}`.concat(uri), {
        method: method,
        headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
            'Content-Type': 'application/json'
        },
        body: body //Request body
    })
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
            "project_id": project_id,
            "ratings": {}
        })
        return makeFetch('groups/_doc', arrayMethods.POST, requestBody)
            .then(body => {
                if(!body.error) return body._id;
                else return pgResponses.setError(pgResponses.DB_ERROR)
            })
            .catch(() => {
                pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    getUserGroups: function(owner) {
        return makeFetch(`groups/_search?q=owner:${owner}`, arrayMethods.POST, requestBody)
            .then(body => {
                if(body.hits && body.hits.hits.length) {
                    return body.hits.hits.map(hit => {
                        hit._source.id = hit._id;
                        return hit._source;
                    });
                } else {
                    return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_GROUPS_MSG);
                }
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    getGroupDetails: function(id) {
        return makeFetch(`groups/_doc/${id}`, arrayMethods.GET, null)
            .then(body => {
                if(body.found) {
                    body._source.id = body._id;
                    return body._source;
                } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_GROUPS_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    getRankings: function() {
        //TODO
    },

    createUser: function() {
        //TODO
    }
}