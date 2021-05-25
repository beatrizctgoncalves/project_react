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
            
<<<<<<< HEAD
            return authUser.create(username,password).then(()=>{

                return database.createUser(username,name,surname)
                
            }).then(()=>{
                return {
                    status: pgResponses.OK,
                    body: pgResponses.URI_MSG.concat(index).concat(username)
=======
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
>>>>>>> 6494e483c480cd3bd08e643c28b00a8032b13dae
                }
                return pgResponses.setError(err.status, err.body)

            });
            
        },
<<<<<<< HEAD
=======

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
>>>>>>> 6494e483c480cd3bd08e643c28b00a8032b13dae

        getUser : function(username) {
            
            return database.getUser(username)
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