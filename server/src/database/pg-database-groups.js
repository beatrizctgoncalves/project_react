'use strict'
const fetch = require('node-fetch');


function database(requests, pgResponses) {
    const dt = {
        createGroup: function(owner, group_name, group_description) {
            var requestBody = JSON.stringify({
                "owner": owner,
                "name": group_name,
                "description": group_description,
                "members": [owner],
                "projects": [],
                "ratings": []
            })
            
            return fetch(`http://localhost:9200/groups/_doc`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: requestBody //Request body
            }).then(response => response.json()).then(body => {
                if(!body.error) return body._id;
                else return pgResponses.setError(pgResponses.DB_ERROR)
            })
            .catch(() => {
                   return  pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG)
                });




            /*
            return requests.makeFetchElastic('groups/_doc', requests.arrayMethods.POST, requestBody)
                .then(body => {
                    if(!body.error) return body._id;
                    else return pgResponses.setError(pgResponses.DB_ERROR)
                })
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))

                */
        },

        getUserGroups: function(owner) {

           return  fetch(`http://localhost:9200/groups/_search?q=owner:${owner}`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: null //Request body
            }).then(response => response.json())
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
            .catch(() => {
                   return  pgResponses.resolveErrorElastic(error)
                });




            /*
            return makeFetch(`groups/_search?q=owner:${owner}`, requests.arrayMethods.POST, null)
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
                .catch(error => pgResponses.resolveErrorElastic(error))
                */
        },

        getGroupDetails: function(id) {


            return fetch(`http://localhost:9200/groups/_doc/${id}`, {
                method: 'GET',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: null //Request body
            }).then(response => response.json())
            .then(body => {
                if(body.found) {
                    body._source.id = body._id;
                    return body._source;
                } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
            })
            .catch(error => pgResponses.resolveErrorElastic(error));


            /*
            return makeFetch(`groups/_doc/${id}`, arrayMethods.GET, null)
                .then(body => {
                    if(body.found) {
                        body._source.id = body._id;
                        return body._source;
                    } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
                })
                .catch(error => pgResponses.resolveErrorElastic(error))

                */
        },

        deleteGroup: function(group_id) {

            return fetch(`http://localhost:9200/groups/_doc/${group_id}?refresh=true`, {
                method: 'DELETE',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: null //Request body
            }).then(response => response.json())
            .then(body => {
                if(body.result === 'deleted') return body._id
                else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
            })
            .catch(error => pgResponses.resolveErrorElastic(error));


            /*
            return makeFetch(`groups/_doc/${group_id}?refresh=true`, arrayMethods.DELETE, null)
                .then(body => {
                    if(body.result === 'deleted') return body._id
                    else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
                })
                .catch(error => pgResponses.resolveErrorElastic(error))

                */
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
            return fetch(`http://localhost:9200/groups/_update/${group_id}`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: requestBody //Request body
            }).then(response => response.json())
            .then(body => {
                if(body.result == 'updated') {
                    return body._id;
                } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
            })
            .catch(error => pgResponses.resolveErrorElastic(error));
            
            
            
            /*makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
                .then(body => {
                    if(body.result == 'updated') {
                        return body._id;
                    } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_group_MSG);
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
                */
        },

        /*addProjectJiraToGroup: function(group_id, information) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.projects.add(params.projects)",
                    "params": {
                        "projects": {
                            "id": information.id,
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
            return fetch(`http://localhost:9200/groups/_update/${group_id}`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: requestBody //Request body
            }).then(response => response.json())
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG));
            
            
            
            
            /*makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
                */
       /* },

        //should be the same info as the project from Jira (instead of key should be id on both, should be the same)
        addProjectGitlabToGroup: function(group_id, information) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.projects.add(params.projects)",
                    "params": {
                        "projects": {
                            "id": information.id,
                            "owner_name": information.owner_name,
                            "owner_id": information.owner_id,
                            "description": information.description,
                            "avatar": information.avatar,
                            "type": information.type
                        }
                    }
                }
            });


            return fetch(`http://localhost:9200/groups/_update/${group_id}`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: requestBody //Request body
            }).then(response => response.json())
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG));
            
            
            /*makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))

                */
        /*},*/

        addProjectToGroup: function(group_id, information) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.projects.add(params.projects)",
                    "params": {
                        "projects": {
                            "id": information.id,
                            "owner_name": information.owner_name,
                            "owner_id": information.owner_id,
                            "description": information.description,
                            "avatar": information.avatar,
                            "type": information.type
                        }
                    }
                }
            });


            return fetch(`http://localhost:9200/groups/_update/${group_id}`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: requestBody //Request body
            }).then(response => response.json())
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG));
            
            
            /*makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))

                */
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
            return fetch(`http://localhost:9200/groups/_update/${group_id}`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: requestBody //Request body
            }).then(response => response.json())
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG));
            
            
            /*
            makeFetch(`groups/_update/${group_id}`,arrayMethods.POST,requestBody)
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
                */
        },

        addMemberToGroup: function(group_id, username){
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.members.add(params.members)",
                    "params": {
                        "members": username
                    }
                }
            });
            return fetch(`http://localhost:9200/groups/_update/${group_id}`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: requestBody //Request body
            }).then(response => response.json())
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG));
            
            /*makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
                */
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
            return fetch(`http://localhost:9200/groups/_update/${group_id}`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: requestBody //Request body
            }).then(response => response.json())
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG));
            
            
            /*
            makeFetch(`groups/_update/${group_id}`,arrayMethods.POST,requestBody)
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
                */
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
            return fetch(`http://localhost:9200/groups/_update/${group_id}`, {
                method: 'POST',
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: requestBody //Request body
            }).then(response => response.json())
            .then(body => body._id)
            .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG));
            
            
            /*makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
                */
        },

        getRankings: function() {
            //TODO
        }
    }
    return dt;
}

module.exports = database;