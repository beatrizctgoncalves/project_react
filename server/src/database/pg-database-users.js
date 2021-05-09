'use strict'


function database(requests, pgResponses) {
    const dt = {
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
    return dt;
}

module.exports = database;