'use strict'

function services(database, pgResponses, authization) {
    const authUser = authization.user
    const serv = {        /*
        createUser: function(username, password, index) { //TODO
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(username)) {  //verify if username is a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            }
            return database.getUser(username)
                .then(() => pgResponses.setError(pgResponses.FORBIDDEN, pgResponses.FORBIDDEN_MSG))
                .catch(error => {
                    if(error.status == pgResponses.FORBIDDEN || error.status == pgResponses.BAD_REQUEST || error.status == pgResponses.DB_ERROR) {
                        return pgResponses.setError(error.status, error.body);
                    }
                    return database.createUser(username, password)
                        .then(() => {
                            return {
                                status: pgResponses.OK,
                                body: pgResponses.URI_MSG.concat(index).concat(username)
                            }
                        })
                })
        },*/

        createUser: function(username, password, index) { //TODO
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(username)) {  //verify if username is a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            }
            
            return authUser.create(username,password).then(()=>{
                return {
                    status: pgResponses.OK,
                    body: pgResponses.URI_MSG.concat(index).concat(username)
                }

            }).catch(error=>{
                return pgResponses.setError(error.status,error.body)
            });
            
        },
        /*

        getUser: function(username) {
            return database.getUser(username)
                .then(userObj => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        userObj
                    )
                })
        },*/

        getUser: function(username) {
            return authUser.getByUsername(username)
                .then(userObj => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        userObj
                    )
                })
        },




        updateUser: function(username, firstName, lastName, email, password, index) {
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

        deleteUser: function(username, index) {

            /**
             * TODO()
             * delete this user from all groups
             * 
             */

            return this.getUser(username).then(user => {
                return authUser.delete(user.body.id)
                .then(user_name => {
                    return pgResponses.setSuccessUri(
                        pgResponses.OK,
                        user_name,
                        index
                    )
                })


            }).catch(error => {
                return pgResponses.setError(error.status,error.body)
            })
        }
    }
    return serv;
}

module.exports = services;