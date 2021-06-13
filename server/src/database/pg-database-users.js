'use strict'


function database(pgResponses, requests) {
    const dt = {
        createUser: function (username, name, surname) {
            var requestBody = JSON.stringify({
                "username": username,
                "name": name,
                "surname": surname,
                "info": []
            });

            return requests.makeFetchElastic(requests.index.users.concat('_doc'), requests.arrayMethods.POST, requestBody)
                .then(() => username)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        getUser: function (username) {
            return requests.makeFetchElastic(requests.index.users.concat(`_search?q=username:${username}`), requests.arrayMethods.GET, null)
                .then(body => {
                    if (body.hits && body.hits.hits.length) return body.hits.hits.map(hit => hit._source)[0];
                    else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                })
                .catch(error => {
                    if (error.status == pgResponses.NOT_FOUND) return error
                    else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
                })
        },
        
        getUserIdES : function(username){
            return requests.makeFetchElastic(requests.index.users.concat(`_search?q=username:${username}`), requests.arrayMethods.GET, null)
                .then(body => body.hits.hits.map(hit => hit._id))
        },

        updateUser: function (username, updatedInfo) {
            var requestBody = JSON.stringify({
                "script": {
                    "source": "if(params.name != null) ctx._source.name = params.name; if(params.surname != null) ctx._source.surname = params.surname; if(params.email != null) ctx._source.email = params.email; if(params.info != null) ctx._source.info = params.info;",
                    "params": updatedInfo
                }
            });

            return this.getUserIdES(username)
                .then(id => {
                    return requests.makeFetchElastic(requests.index.users.concat(`_update/${id}`), requests.arrayMethods.POST, requestBody)
                        .then(body => {
                            if (body.result == 'updated') {
                                return body._id;
                            } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                        })
                })
                .catch(error => {
                    if (error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, error.body);
                    else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
                })
        },

        deleteUser: function (username) {
            return this.getUser(username)
                .then(id => {
                    return requests.makeFetchElastic(requests.index.users.concat(`_doc/${id}`), requests.arrayMethods.DELETE, null)
                        .then(body => {
                            if (body.result === 'deleted') return body.username
                            else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                        })
                })
                .catch(error => {
                    if (error.status == pgResponses.NOT_FOUND) return error
                    else return pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG);
                })
        }
    }
    return dt;
}

module.exports = database;