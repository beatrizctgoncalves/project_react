'use strict'

function services(database, pgResponses, authization) {
    const authUser = authization.user
    const serv = {     

        createUser: function(username, password,name,surname, index) { //TODO
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(username)) {  //verify if username is a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            }
            
            return authUser.create(username,password)
            .then(()=>{
                console.log("antes do create");
                return database.createUser(username,name,surname).then(()=>{
                    console.log("dps do create");
                    return {
                        status: pgResponses.OK,
                        body: pgResponses.URI_MSG.concat(index).concat(username)
                    }
                })
                
            }).catch(err =>{
                console.log(err);
                
                if(!err.body)  err.body = err.error.errors[0].message
                else{
                    this.deleteFromAuthization(username);
                }
                return pgResponses.setError(err.status, err.body)

            });
            
        },

        getUserAuthization: function(username) {
            return authUser.getByUsername(username)
                .then(userObj => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        userObj
                    )
                }).catch(error => {
                    pgResponses.setError(error.status,error.body)
                })
        },

        getUser : function(username) {
            
            return database.getUser(username)
                .then(userObj => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        userObj
                    )
                })
        },




        updateUser: function(username, updatedInfo) {
            return database.getUser(username)
                .then(user => {
                    return database.updateUser(user.username, updatedInfo)
                        .then(user_name => {
                            console.log("AQUI 2---------------------------------------------------")
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                'users/',
                                user_name
                            )
                        })
                })
        },

        deleteFromAuthization : function(username){
            return this.getUserAuthization(username)
            .then(user => {
                return authUser.delete(user.body.id)
            }).catch(err=>{
                if(!err.body)  err.body = err.error.errors[0].message;
                return  pgResponses.setError(err.status, err.body);
            })


        },

        deleteUser: function(username, index) {

            /**
             * TODO()
             * delete this user from all groups
             * 
             */
                console.log("DELETE START SERVICE")
            return this.deleteFromAuthization(username)
                .then(()=>{
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
                .catch(error => {
                return pgResponses.setError(error.status,error.body)
            })
        }
    }
    return serv;
}

module.exports = services;