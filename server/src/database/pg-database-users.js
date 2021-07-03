'use strict'


function database(pgResponses, requests) {
    const dt = {
        createUser: function (username, name, surname) {
            var requestBody = JSON.stringify({
                "username": username,
                "name": name,
                "surname": surname,
                "avatar": "http://mundocarreira.com.br/wp-content/uploads/2015/08/1-profissional-multifuncional.jpg",
                "groupsMember": [],
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
                        })[0]
                    } else {
                        return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                    }
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        },

        updateUser: function (username, updatedInfo) {
            var requestBody = JSON.stringify({
                "script": {
                    "source": "if(params.name !== null) ctx._source.name = params.name; " +
                        "if(params.surname !== null) ctx._source.surname = params.surname; " +
                        "if(params.avatar !== null) ctx._source.avatar = params.avatar;" +
                        "if(params.groupsMember !== null) ctx._source.groupsMember = params.groupsMember;" +
                        "if(params.notifications !== null) ctx._source.notifications = params.notifications;",
                    "params": updatedInfo
                }
            });

            return this.getUser(username)
                .then(userObj => {
                    return requests.makeFetchElastic(requests.index.users.concat(`_update/${userObj.id}`), requests.arrayMethods.POST, requestBody)
                        .then(body => {
                            if (body.result === 'updated') {
                                return body._id;
                            } else {
                                return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_USER_MSG);
                            }
                        })
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        },

        addGroupToUser: function (username, groupId) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline":  "ctx._source.groupsMember.add(params.groupId) ",
                    "params":{
                        "groupId": groupId
                    }
                }
            });

            return this.getUser(username)
                .then(userObj => {
                    return requests.makeFetchElastic(requests.index.users.concat(`_update/${userObj.id}`), requests.arrayMethods.POST, requestBody)
                        .then(body => {
                            if (body.result === 'updated') {
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
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${user_id}`), requests.arrayMethods.POST, requestBody)
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        removeMemberGroup: function (username, groupId) { //TODO
            let requestBody = undefined
            return this.getUser(username)
                .then(userObj => {
                    const group_index = userObj.groupsMember.findIndex(group => group === groupId)  //get the groups's index
                    if (group_index === -1) { //the user doesnt exist in the group
                        return pgResponses.setError(
                            pgResponses.NOT_FOUND,
                            pgResponses.NOT_FOUND_USER_MSG
                        );
                    }
                    requestBody = JSON.stringify({
                        "script": {
                            "lang": "painless",
                            "inline": "ctx._source.groupsMember.remove(params.groupId)",
                            "params": {
                                "groupId": group_index
                            }
                        }
                    });
                    return userObj.id
                })
                .then(userId => requests.makeFetchElastic(requests.index.users.concat(`_update/${userId}`), requests.arrayMethods.POST, requestBody))
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