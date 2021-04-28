'use strict'

function services(database, pgResponses, apiGitlab, apiJira) {
    const serv = {

        createGroup: function(owner, name, description, type, group_id, index) {
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(name) || !description || !owner) {  //verify if name has a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            }
            return database.createGroup(owner, name, description, type, group_id)
                .then(groups => {
                    return pgResponses.setSuccessUri(
                        pgResponses.CREATE,
                        index,
                        groups
                    )
                })
        },

        getUserGroups: function(owner) {
            return database.getUserGroups(owner)
                .then(groups => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        groups
                    )
                })
        },

        getGroupDetails: function(group_id) {
            return database.getGroupDetails(group_id)
                .then(group => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        group
                    )
                })
        },

        deleteGroup: function(group_id, index) {
            return database.deleteGroup(group_id)
                .then(group => {
                    return pgResponses.setSuccessUri(
                        pgResponses.OK,
                        index,
                        group
                    )
                })
        },

        editGroup: function(group_id, new_name, new_desc, index) {
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(new_name)) {  //verify if new_name has a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            } else {
                return database.editGroup(group_id, new_name, new_desc)
                    .then(group => {
                        return pgResponses.setSuccessUri(
                            pgResponses.OK,
                            index,
                            group
                        )
                    })
            }
        },

        getGroupMembers: function(group_id, new_name, new_desc, index) {
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(new_name)) {  //verify if new_name has a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            } else {
                return database.editGroup(group_id, new_name, new_desc)
                    .then(group => {
                        return pgResponses.setSuccessUri(
                            pgResponses.OK,
                            index,
                            group
                        )
                    })
            }
        },

        addMemberToGroup: function(group_id, username, index) {
            return database.getUser(username) //check if the user exists
                .then(userObj => {
                    return database.getGroupDetails(group_id) //check if the group exists
                        .then(groupObj => {
                            const userExists = groupObj.members.findIndex(m => m.username === parseInt(username))
                            if(userExists != -1) {  //check if the user already exists in the group
                                return pgResponses.setError(
                                    pgResponses.FORBIDDEN,
                                    pgResponses.FORBIDDEN_MSG
                                )
                            }
                            return database.addMemberToGroup(group_id, username) //add user
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

        removeMemberFromGroup: function(group_id, username, index) {
            return database.getGroupDetails(group_id) //check if the group exists
                .then(groupObj => {
                    const user_index = groupObj.members.findIndex(m => m.user === username)  //get the user's index
                    if(user_index === -1) { //the user doesnt exist in the group
                        return pgResponses.setError(
                            pgResponses.NOT_FOUND,
                            pgResponses.NOT_FOUND_USER_MSG
                        );
                    }
                    return database.removeMemberFromGroup(group_id, user_index) //remove the user by index
                        .then(id => {
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                index,
                                id
                            )
                        })
                })
        },

        getgroupRankings: function(group_id) {
            //TODO
        },

        getRankings: function() {
            //TODO
        },



        /*** USERS ***/
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
            return database.getUserId(username)
                .then(id => {
                    return database.deleteUser(id)
                        .then(user_name => {
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                user_name,
                                index
                            )
                        })
                })
        },

        getJiraIssuesFromGroup: function(group_id) {
            return apiJira.getJiraIssues()
        }
    }
    return serv;
}

module.exports = services;