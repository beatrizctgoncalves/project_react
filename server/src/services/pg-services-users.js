'use strict'

function services(database, pgResponses, authization) {
    const authUser = authization.user
    const serv = {

        createUser: function (username, password, name, surname, index) { //TODO
            var regExp = /[a-zA-Z]/g;
            if (!regExp.test(username)) {  //verify if username is a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            }

            return authUser.create(username, password)
                .then(() => {
                    return database.createUser(username, name, surname)
                        .then(() => {
                            return {
                                status: pgResponses.OK,
                                body: pgResponses.URI_MSG.concat(index).concat(username)
                            }
                        })
                        .catch(error => {
                            this.deleteFromAuthization(username);
                        })
                })
        },

        createUser: function (username, password, index) { //TODO

            var regExp = /[a-zA-Z]/g;
            if (!regExp.test(username)) {  //verify if username is a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            }
            return authUser.create(username, password)
                .then(() => {
                    return {
                        status: pgResponses.CREATE,
                        body: pgResponses.URI_MSG.concat(index).concat(username)
                    }
                })
                .catch(error => pgResponses.setError(error.status, error.body));
        },

        getUserAuthization: function (username) {
            return authUser.getByUsername(username)
                .then(userObj => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        userObj
                    )
                }).catch(error => {
                    pgResponses.setError(error.status, error.body)
                })
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

        updateUser: function (username, firstName, lastName, email, password, index) {
            return database.getUserId(username)
                .then(id => {
                    return database.updateUser(id, firstName, lastName, email, password)
                        .then(user_name => {
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                user_name,
                                index
                            )
                        })
                })
        },

        deleteFromAuthization: function (username) {
            return this.getUserAuthization(username)
                .then(user => authUser.delete(user.body.id))
        },

        deleteUser: function (username, index) {

            /**
             * TODO()
             * delete this user from all groups
             * 
             */
            console.log("DELETE START SERVICE")
            return this.deleteFromAuthization(username)
                .then(() => {
                    console.log("DELETE SERVICE");
                    return database.deleteUser(username)
                        .then(user_name => {
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                user_name,
                                index
                            )
                        })
                })
                .catch(error => pgResponses.setError(error.status, error.body))
        }
    }
    return serv;
}

module.exports = services;