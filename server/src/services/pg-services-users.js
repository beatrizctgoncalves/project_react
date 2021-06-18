'use strict'

function services(database, pgResponses, authization) {
    const authUser = authization.user
    const serv = {
        createUser: function (username, password, name, surname, email) { //TODO
            var regExp = /[a-zA-Z]/g;
            if (!regExp.test(username)) {  //verify if username is a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            }
            return authUser.create(username, password)
                .then(database.createUser(username, name, surname, email))
                .then(() => {
                    return pgResponses.setSuccessUri(
                        pgResponses.CREATE,
                        pgResponses.index.users,
                        username,
                        ""
                    )
                })
                .catch(err => {
                    if (!err.body) err.body = err.errors[0].message
                    else this.deleteFromAuthization(username);
                    return pgResponses.setError(err.status, err.body)
                })
        },

        getUserAuthization: function (username) {
            return authUser.getByUsername(username)
                .then(userObj => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        userObj
                    )
                })
                .catch(error => pgResponses.setError(error.status, error.body))
        },

        getUser: function (username) {
            return database.getUser(username)
                .then(userObj => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        userObj
                    )
                })
        },

        updateUser: function (username, updatedInfo) {
            return database.getUser(username)
                .then(user => {
                    console.log(user)
                    user.info.forEach(info => {
                        if(!updatedInfo.info.find(i => i.type == info.type))
                            updatedInfo.info.push(info)
                    })
                    return database.updateUser(user.username, updatedInfo)
                        .then(user_name => {
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                pgResponses.index.users,
                                user_name,
                                ""
                            )
                        })
                })
        },

        deleteFromAuthization: function (username) {
            return this.getUserAuthization(username)
                .then(user => authUser.delete(user.body.id))
                .catch(err => {
                    if (!err.body) err.body = err.error.errors[0].message;
                    return pgResponses.setError(err.status, err.body);
                })
        },

        deleteUser: function (username) {
            /**
             * TODO
             * delete this user from all groups
             */
            return this.deleteFromAuthization(username)
                .then(() => {
                    console.log("DELETE SERVICE");
                    return database.deleteUser(username)
                        .then(user_name => {
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                pgResponses.index.users,
                                user_name,
                                ""
                            )
                        })
                })
        }
    }
    return serv;
}

module.exports = services;