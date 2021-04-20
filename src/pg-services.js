'use strict'

function services(database, pgResponses, apiGitlab, apiJira) {
    const serv = {

        createProject: function(owner, name, description, type, project_id, index) {
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(name) || !description || !owner) {  //verify if name has a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            }
            return database.createProject(owner, name, description, type, project_id)
                .then(groups => {
                    return pgResponses.setSuccessUri(
                        pgResponses.CREATE,
                        index,
                        groups
                    )
                })
        },

        getUserProjects: function(owner) {
            return database.getUserProjects(owner)
                .then(groups => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        groups
                    )
                })
        },

        getProjectDetails: function(project_id) {
            return database.getProjectDetails(project_id)
                .then(group => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        group
                    )
                })
        },

        deleteProject: function(project_id, index) {
            return database.deleteProject(project_id)
                .then(group => {
                    return pgResponses.setSuccessUri(
                        pgResponses.OK,
                        index,
                        group
                    )
                })
        },

        editProject: function(project_id, new_name, new_desc, index) {
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(new_name)) {  //verify if new_name has a string
                return pgResponses.setError( //send the uri with id
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            } else {
                return database.editProject(project_id, new_name, new_desc)
                    .then(group => {
                        return pgResponses.setSuccessUri(
                            pgResponses.OK,
                            index,
                            group
                        )
                    })
            }
        },

        addMemberToProject: function(project_id, username, index) {
            return database.getUser(username) //check if the user exists
                .then(userObj => {
                    return database.getProjectDetails(project_id) //check if the project exists
                        .then(projectObj => {
                            const userExists = projectObj.members.findIndex(m => m.username === parseInt(username))
                            if(userExists != -1) {  //check if the user already exists in the project
                                return pgResponses.setError(
                                    pgResponses.FORBIDDEN,
                                    pgResponses.FORBIDDEN_MSG
                                )
                            }
                            return database.addMemberToProject(project_id, username) //add user
                                .then(finalObj => {
                                    return pgResponses.setSuccessUri(
                                        pgResponses.OK,
                                        index,
                                        finalObj
                                    )   
                                })
                        })
                })
        },

        removeMemberFromProject: function(project_id, username, index) {
            return database.getProjectDetails(project_id) //check if the project exists
                .then(projectObj => {
                    const user_index = projectObj.members.findIndex(m => m.user === username)  //get the user's index
                    if(user_index === -1) { //the user doesnt exist in the project
                        return pgResponses.setError(
                            pgResponses.NOT_FOUND,
                            pgResponses.NOT_FOUND_USER_MSG
                        );
                    }
                    return database.removeMemberFromProject(project_id, user_index) //remove the user by index
                        .then(id => {
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                index,
                                id
                            )
                        })
                })
        },

        getProjectRankings: function(project_id) {
            //TODO
        },

        getRankings: function() {
            //TODO
        },



        //USERS
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
        },

        getUser: function(username) {
            return database.getUser(username)
                .then(userObj => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        userObj
                    )
                })
        }
    }
    return serv;
}

module.exports = services;