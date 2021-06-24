'use strict'


function database(pgResponses, requests) {
    const dt = {
        createUser: function (username, name, surname) {
            var requestBody = JSON.stringify({
                "username": username,
                "name": name,
                "surname": surname,
                "avatar": "https://thumbs.dreamstime.com/b/programmer-linear-icon-technologist-freelancer-thin-line-illustration-contour-symbol-vector-isolated-outline-drawing-programmer-197065655.jpg",
                "info": [],
                "notifications": []
            });

            return requests.makeFetchElastic(requests.index.users.concat('_doc'), requests.arrayMethods.POST, requestBody)
                .then(() => username)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        getUser: function (username) {
            return requests.makeFetchElastic(requests.index.users.concat(`_search?q=username:${username}`), requests.arrayMethods.GET, null)
                .then(body => {
                    if (body.hits && body.hits.hits.length) {
                        return body.hits.hits.map(hit => {
                            hit._source.id = hit._id;
                            return hit._source;
                        })
                    } else {
                        return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                    }
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        },

        updateUser: function (username, updatedInfo) {
            var requestBody = JSON.stringify({
                "script": {
                    "source": "if(params.name != null) ctx._source.name = params.name; " +
                        "if(params.surname != null) ctx._source.surname = params.surname; " +
                        "if(params.email != null) ctx._source.email = params.email; " +
                        "if(params.info != null) ctx._source.info = params.info;",
                    "params": updatedInfo
                }
            });

            return this.getUser(username)
                .then(userObj => {
                    return requests.makeFetchElastic(requests.index.users.concat(`_update/${userObj.id}`), requests.arrayMethods.POST, requestBody)
                        .then(body => {
                            if (body.result == 'updated') {
                                return body._id;
                            } else {
                                return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                            }
                        })
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        },

        updateUser: function (username, updatedAvatar) {
            var requestBody = JSON.stringify({
                "script": {
                    "source": "ctx._source.avatar = params.updatedAvatar;",
                    "params": {
                        "updatedAvatar": updatedAvatar
                    }
                }
            });

            return this.getUser(username)
                .then(userObj => {
                    return requests.makeFetchElastic(requests.index.users.concat(`_update/${userObj.id}`), requests.arrayMethods.POST, requestBody)
                        .then(body => {
                            if (body.result == 'updated') {
                                return body._id;
                            } else {
                                return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                            }
                        })
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        },

        addNotificationToUser: function (group_id, memberId, manager) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.notifications.add(params.notifications)",
                    "params": {
                        "notifications": {
                            "manager": manager,
                            "group_id": group_id
                        }
                    }
                }
            });

            return requests.makeFetchElastic(requests.index.users.concat(`_update/${memberId}`), requests.arrayMethods.POST, requestBody)
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        removeUserNotification: function (user_id, notification_index) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.notifications.remove(params.notification)",
                    "params": {
                        "notification": notification_index
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${user_id}`), arrayMethods.POST, requestBody)
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        deleteUser: function (username) {
            return this.getUser(username)
                .then(userObj => requests.makeFetchElastic(requests.index.users.concat(`_doc/${userObj.id}`), requests.arrayMethods.DELETE, null))
                .then(body => {
                    if (body.result === 'deleted') return body.username;
                    else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        }
    }
    return dt;
}

module.exports = database;