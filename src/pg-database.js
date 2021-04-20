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
    createProject: function(owner, project_name, project_description, type, project_id) {
        var requestBody = JSON.stringify({
            "owner": owner,
            "name": project_name,
            "description": project_description,
            "members": [],
            "type": type,
            "project_id": project_id,
            "ratings": {}
        })
        return makeFetch('projects/_doc', arrayMethods.POST, requestBody)
            .then(body => {
                if(!body.error) return body._id;
                else return pgResponses.setError(pgResponses.DB_ERROR)
            })
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
    },

    getUserProjects: function(owner) {
        return makeFetch(`projects/_search?q=owner:${owner}`, arrayMethods.POST, null)
            .then(body => {
                if(body.hits && body.hits.hits.length) {
                    return body.hits.hits.map(hit => {
                        hit._source.id = hit._id;
                        return hit._source;
                    });
                } else {
                    return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_PROJECTS_MSG);
                }
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    getProjectDetails: function(id) {
        return makeFetch(`projects/_doc/${id}`, arrayMethods.GET, null)
            .then(body => {
                if(body.found) {
                    body._source.id = body._id;
                    return body._source;
                } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_PROJECT_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    deleteProject: function(project_id) {
        return makeFetch(`projects/_doc/${project_id}?refresh=true`, arrayMethods.DELETE, null)
            .then(body => {
                if(body.result === 'deleted') return body._id
                else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_PROJECT_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    editProject: function(project_id, new_name, new_desc) {
        var requestBody = JSON.stringify({
            "script": {
                "source": "ctx._source.name = params.name; ctx._source.description = params.description",
                "params": {
                    "name": `${new_name}`,
                    "description": `${new_desc}`
                }
            }
        });
        return makeFetch(`projects/_update/${project_id}`, arrayMethods.POST, requestBody)
            .then(body => {
                if(body.result == 'updated') {
                    return body._id;
                } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_PROJECT_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    addMemberToProject: function(project_id, username){
        var requestBody = JSON.stringify({
            "script": {
                "lang": "painless",
                "inline": "ctx._source.members.add(params.members)",
                "params": {
                    "members": {
                        "user": username,
                    }
                }
            }
        });
        return makeFetch(`projects/_update/${project_id}`, arrayMethods.POST, requestBody)
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
    },

    removeMemberFromProject: function(project_id, user_index) {
        var requestBody =  JSON.stringify({
            "script": {
                "lang": "painless",
                "inline": "ctx._source.members.remove(params.user)",
                "params": {
                    "user": user_index
                }
            }
        });
        return makeFetch(`projects/_update/${project_id}`,arrayMethods.POST,requestBody)
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
    },

    getRankings: function() {
        //TODO
    },



    //USERS
    createUser: function(username, password) { //TODO
        var requestBody = JSON.stringify({
            "username": username,
            "password": password
        });
        return makeFetch('users/_doc', arrayMethods.POST, requestBody)
            .then(() => username)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
    },

    getUser: function(username) {
        return makeFetch(`users/_search?q=username:${username}`, arrayMethods.GET, null)
            .then(body => {
                if(body.hits && body.hits.hits.length) return body.hits.hits.map(hit => hit._source)[0];
                else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    }
}