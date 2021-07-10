'use strict'

function services(databaseUsers, databaseGroups, servicesGroups, pgResponses, authization) {
    const authUser = authization.user

    const serv = {
        createUser: function (request) {
            const username = request.body.username;
            const password = request.body.password;
            const name = request.body.name;
            const surname = request.body.surname;
            const email = request.body.email;

            var regExp = /[a-zA-Z]/g;
            if (!regExp.test(username)) {  //verify if username is a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            }
            return authUser.create(username, password)
                .then(databaseUsers.createUser(username, name, surname, email))
                .then(() => {
                    return pgResponses.setSuccessUri(
                        pgResponses.CREATE,
                        pgResponses.index.users,
                        "/",
                        username
                    )
                })
                .catch(err => {
                    if (!err.body) err.body = err.errors[0].message;
                    else this.deleteFromAuthization(username);
                    return pgResponses.setError(err.status, err.body);
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
            return databaseUsers.getUser(username)
                .then(userObj => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        userObj
                    )
                })
        },

        updateUser: function (username, updatedInfo) {
            if (updatedInfo.updatedAvatar) {  //verify if avatar is a valid link
                if (updatedInfo.updatedAvatar.substr(updatedInfo.updatedAvatar.length - 4) !== '.png') {  //verify if avatar is a valid link
                    return pgResponses.setError(
                        pgResponses.BAD_REQUEST,
                        pgResponses.BAD_REQUEST_AVATAR_MSG
                    )
                }
            }

            return databaseUsers.updateUser(username, updatedInfo)
                .then(user_name => {
                    return pgResponses.setSuccessUri(
                        pgResponses.OK,
                        pgResponses.index.users,
                        user_name,
                        ""
                    )
                })
        },
        
        addMemberToGroup: function (group_id, member) {
            return databaseGroups.addMemberToGroup(group_id, member)
                .then(() => {
                    return pgResponses.setSuccessUri(
                        pgResponses.OK,
                        pgResponses.index.api,
                        pgResponses.index.groups,
                        group_id
                    )
                })
        },

        deleteFromAuthization: function (username) {
            return this.getUserAuthization(username)
                .then(user => authUser.delete(user.body.id))
                .catch(err => {
                    if (!err.body) return err.body = err.error.errors[0].message;
                    else return pgResponses.setError(err.status, err.body);
                })
        },

        deleteUser: function (username) {
            return databaseGroups.getUserGroups(username)  //remove groups which username is owner
                .then(groups => {
                    if(!groups) return undefined
                    let promisses = groups.map(g => servicesGroups.deleteGroup(g.id))
                    return Promise.all(promisses)
                })
                .then(() => servicesGroups.getUserMemberGroups(username))
                .then(groups => {
                    if(!groups) return undefined
                    let promisses = groups.body.map(g => servicesGroups.removeMemberFromGroup(g.id,username))
                    return Promise.all(promisses)
                })
                .then(() => this.deleteFromAuthization(username))
                .then(() => databaseUsers.deleteUser(username))
                .then(() => {
                    return pgResponses.setSuccessUri(
                        pgResponses.OK,
                        pgResponses.index.users,
                        "/" + username,
                        ""
                    )
                })
        }
    }
    return serv;
}

module.exports = services;