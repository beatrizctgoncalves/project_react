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
    createGroup: function(owner, group_name, group_description) {
        var requestBody = JSON.stringify({
            "owner": owner,
            "name": group_name,
            "description": group_description,
            "members": [],
            "projects": [],
            "ratings": []
        })
        return makeFetch('groups/_doc', arrayMethods.POST, requestBody)
            .then(body => {
                if(!body.error) return body._id;
                else return pgResponses.setError(pgResponses.DB_ERROR)
            })
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
    },

    getUserGroups: function(owner) {
        return makeFetch(`groups/_search?q=owner:${owner}`, arrayMethods.POST, null)
            .then(body => {
                if(body.hits && body.hits.hits.length) {
                    return body.hits.hits.map(hit => {
                        hit._source.id = hit._id;
                        return hit._source;
                    });
                } else {
                    return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_groupS_MSG);
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
                } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    deleteGroup: function(group_id) {
        return makeFetch(`groups/_doc/${group_id}?refresh=true`, arrayMethods.DELETE, null)
            .then(body => {
                if(body.result === 'deleted') return body._id
                else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    editGroup: function(group_id, new_name, new_desc) {
        var requestBody = JSON.stringify({
            "script": {
                "source": "ctx._source.name = params.name; ctx._source.description = params.description",
                "params": {
                    "name": `${new_name}`,
                    "description": `${new_desc}`
                }
            }
        });
        return makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
            .then(body => {
                if(body.result == 'updated') {
                    return body._id;
                } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    addProjectJiraToGroup: function(group_id, information) {
        var requestBody = JSON.stringify({
            "script": {
                "lang": "painless",
                "inline": "ctx._source.projects.add(params.projects)",
                "params": {
                    "projects": {
                        "key": information.key,
                        "lead_name": information.lead_name,
                        "lead_id": information.lead_id,
                        "description": information.description,
                        "avatar": information.avatar,
                        "projectTypeKey": information.projectTypeKey,
                        "type": information.type
                    }
                }
            }
        });
        return makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
    },

    removeProjectFromGroup: function(group_id, project_index) {
        var requestBody =  JSON.stringify({
            "script": {
                "lang": "painless",
                "inline": "ctx._source.projects.remove(params.project)",
                "params": {
                    "project": project_index
                }
            }
        });
        return makeFetch(`groups/_update/${group_id}`,arrayMethods.POST,requestBody)
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
    },

    addMemberToGroup: function(group_id, username){
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
        return makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
    },

    removeMemberFromGroup: function(group_id, user_index) {
        var requestBody =  JSON.stringify({
            "script": {
                "lang": "painless",
                "inline": "ctx._source.members.remove(params.user)",
                "params": {
                    "user": user_index
                }
            }
        });
        return makeFetch(`groups/_update/${group_id}`,arrayMethods.POST,requestBody)
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
    },

    addRatingsToGroup: function(group_id, key, accountId, score) {
        var requestBody = JSON.stringify({
            "script": {
                "lang": "painless",
                "inline": "ctx._source.ratings.add(params.ratings)",
                "params": {
                    "ratings": {
                        "key": key,
                        "assignee_id": accountId,
                        "score": score
                    }
                }
            }
        });
        return makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
    },

    getRankings: function() {
        //TODO
    },



    /*** USERS ***/
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
    },

    getUserId: function(username) {
        return makeFetch(`users/_search?q=username:${username}`, arrayMethods.GET, null)
            .then(body => {
                if(body.hits && body.hits.hits.length) return body._id;
                else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    updateUser: function(id, firstName, lastName, email, password) {
        var requestBody = JSON.stringify({
            "script": {
                "source": "ctx._source.name = params.name; ctx._source.description = params.description",
                "params": {
                    "firstName": firstName, 
                    "lastName": lastName,
                    "email": email, 
                    "password": password
                }
            }
        });
        return makeFetch(`groups/_update/${id}`, arrayMethods.POST, requestBody)
            .then(body => {
                if(body.result == 'updated') {
                    return body._id;
                } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    },

    deleteUser: function(id) {
        return makeFetch(`users/_doc/${id}?refresh=true`, arrayMethods.DELETE, null)
            .then(body => {
                if(body.result === 'deleted') return body._id
                else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
            })
    }
}