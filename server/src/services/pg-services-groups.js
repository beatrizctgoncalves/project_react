'use strict'


function services(databaseGroups, databaseUsers, pgResponses) {
    const serv = {
        createGroup: function (owner, name, description) {
            var regExp = /[a-zA-Z]/g;
            if (!regExp.test(name) || !description || !owner) {  //verify if name has a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            }
            return databaseGroups.createGroup(owner, name, description)
                .then(groups => {
                    return pgResponses.setSuccessUri(
                        pgResponses.CREATE,
                        pgResponses.index.api,
                        pgResponses.index.groups,
                        groups
                    )
                })
        },

        getUserMemberGroups: function (username) {
            return databaseUsers.getUser(username)
                .then(user => user.groupsMember)
                .then(groupsMember => {
                    let promisses = []
                    groupsMember.map(groupMember => promisses.push(databaseGroups.getGroupDetails(groupMember)))
                    return promisses
                })
                .then(promisses => Promise.all(promisses))
                .then(groups => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        groups
                    )
                })
        },

        getUserGroups: function (owner) {
            return databaseGroups.getUserGroups(owner)
                .then(groups => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        groups
                    )
                })
        },

        getGroupDetails: function (group_id) {
            return databaseGroups.getGroupDetails(group_id)
                .then(group => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        group
                    )
                })

        },

        deleteGroup: function (group_id) {
            return databaseGroups.deleteGroup(group_id)
                .then(group => {
                    return pgResponses.setSuccessUri(
                        pgResponses.OK,
                        pgResponses.index.api,
                        pgResponses.index.groups,
                        group
                    )
                })
        },

        editGroup: function (group_id, new_name, new_desc) {
            var regExp = /[a-zA-Z]/g;
            if (!regExp.test(new_name)) {  //verify if new_name has a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            } else {
                return databaseGroups.editGroup(group_id, new_name, new_desc)
                    .then(group => {
                        return pgResponses.setSuccessUri(
                            pgResponses.OK,
                            pgResponses.index.api,
                            pgResponses.index.groups,
                            group
                        )
                    })
            }
        },

        getGroupProjects: function (group_id) {
            return databaseGroups.getGroupDetails(group_id)
                .then(group => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        group.projects
                    )
                })
        },

        addProjectToGroup: function (group_id, Pid, PURL, ownerCredentials, type) {
            const x = require("../plugins/" + type + "/api")()
            return x.validateProject(PURL, Pid, ownerCredentials)
                .then(validatedObj => {
                    return databaseGroups.getGroupDetails(group_id)
                        .then(groupObj => {
                            const projectExists = groupObj.projects.findIndex(p => p.id == Pid && p.type == type)
                            if (projectExists != -1) {
                                return pgResponses.setError(
                                    pgResponses.FORBIDDEN,
                                    pgResponses.FORBIDDEN_PROJECTS_MSG
                                )
                            }
                            return databaseGroups.addProjectToGroup(group_id, validatedObj)
                                .then(() => {
                                    return pgResponses.setSuccessUri(
                                        pgResponses.OK,
                                        pgResponses.index.api,
                                        pgResponses.index.groups,
                                        group_id
                                    )
                                })
                        })
                })
        },

        removeProjectFromGroup: function (group_id, PURL, project_id) {
            return databaseGroups.getGroupDetails(group_id)
                .then(groupObj => {
                    const project_index = groupObj.projects.findIndex(p => p.id == project_id && p.URL == PURL)
                    if (project_index == -1) {
                        return pgResponses.setError(
                            pgResponses.NOT_FOUND,
                            pgResponses.NOT_FOUND_PROJECT_MSG
                        );
                    }
                    return databaseGroups.removeProjectFromGroup(group_id, project_index)
                        .then(id => {
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                pgResponses.index.api,
                                pgResponses.index.groups,
                                id
                            )
                        })
                })
        },

        getGroupMembers: function (group_id) {
            return databaseGroups.getGroupDetails(group_id)
                .then(group => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        group.members
                    )
                })
        },

        addMemberToGroup: function (group_id, username) {
            return databaseUsers.getUser(username) //check if the user exists
                .then(userObj => {
                    return databaseGroups.getGroupDetails(group_id) //check if the group exists
                        .then(groupObj => {
                            const userExists = groupObj.members.findIndex(m => m === username)
                            if (userExists !== -1) {  //check if the user already exists in the group
                                return pgResponses.setError(
                                    pgResponses.FORBIDDEN,
                                    pgResponses.FORBIDDEN_USER_MSG
                                )
                            }
                            return databaseUsers.addGroupToUser(username, group_id)
                                .then(databaseGroups.addMemberToGroup(group_id, username)) //add user
                                .then(group => {
                                    return pgResponses.setSuccessUri(
                                        pgResponses.OK,
                                        pgResponses.index.api,
                                        pgResponses.index.groups,
                                        group
                                    )
                                })
                        })
                })
        },

        addMemberInfoToProject: function (group_id, project_URL, project_id, username, memberCredentials) {
            return databaseUsers.getUser(username) //check if the user exists
                .then(userObj => {
                    return databaseGroups.getGroupDetails(group_id) //check if the group exists
                        .then(groupObj => {
                            const project_index = groupObj.projects.findIndex(p => p.id === project_id && p.URL === project_URL)
                            const userExists = groupObj.members.findIndex(m => m === username)
                            if (userExists === -1 || project_index === -1) {
                                return pgResponses.setError(
                                    pgResponses.FORBIDDEN,
                                    pgResponses.FORBIDDEN_USER_INFO_MSG
                                )
                            }
                            return databaseGroups.addMemberInfoToProject(group_id, project_index, username, memberCredentials)
                                .then(group => {
                                    return pgResponses.setSuccessUri(
                                        pgResponses.OK,
                                        pgResponses.index.api,
                                        pgResponses.index.groups,
                                        group
                                    )
                                })
                        })
                })
        },

        /*addMemberNotification: function (group_id, member, manager) { //add the notification to the user
            return databaseUsers.getUser(member) //check if the user exists
                .then(memberObj => {
                    return databaseGroups.getGroupDetails(group_id) //check if the group exists
                        .then(groupObj => {
                            const userExists = groupObj.members.findIndex(m => m.user === member)
                            if (userExists !== -1) {  //check if the user already exists in the group
                                return pgResponses.setError(
                                    pgResponses.FORBIDDEN,
                                    pgResponses.FORBIDDEN_MSG
                                )
                            }
                            return databaseUsers.addNotificationToUser(group_id, memberObj.id, manager)
                                .then(() => {
                                    return pgResponses.setSuccessUri(
                                        pgResponses.OK,
                                        pgResponses.index.api,
                                        pgResponses.index.groups,
                                        group_id
                                    )
                                })
                        })
                })
        },*/

        removeMemberFromGroup: function (group_id, username) {
            return databaseGroups.getGroupDetails(group_id) //check if the group exists
                .then(groupObj => {
                    const user_index = groupObj.members.findIndex(member => member === username)  //get the user's index
                    if (user_index === -1) { //the user doesnt exist in the group
                        return pgResponses.setError(
                            pgResponses.NOT_FOUND,
                            pgResponses.NOT_FOUND_USER_MSG
                        );
                    }
                    return databaseUsers.removeMemberGroup(username, group_id)
                        .then(databaseGroups.removeMemberFromGroup(group_id, user_index)) //remove the user by index
                        .then(group => {
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                pgResponses.index.api,
                                pgResponses.index.groups,
                                group
                            )
                        })
                })
        },

        addSprintToGroup: function (group_id, title, beginDate, endDate) {
            return databaseGroups.getGroupDetails(group_id) //check if the group exists
                .then(groupObj => {
                    const sprintExists = groupObj.sprints.findIndex(s => s.title === title)
                    if (sprintExists !== -1) {  //check if the sprint already exists in the group
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_SPRINT_MSG
                        )
                    }
                    return databaseGroups.addSprintToGroup(group_id, title, beginDate, endDate) //add sprint
                        .then(() => {
                            return pgResponses.setSuccessUri(
                                pgResponses.OK,
                                pgResponses.index.api,
                                pgResponses.index.groups,
                                group_id
                            )
                        })
                })
        },

        /*getGroupRankings: function(group_id, url, email, token) {
            return databaseGroups.getGroupDetails(group_id)
                .then(groupObj => groupObj.projects.map(p => apiJira.getIssues(url, email, token, p.key)))
                .then(issuesObj => Promise.all(issuesObj))
                .then(issues => { 
                    return issues[0].map(i => {
                        if(i.state.statusCategory.key === 'done') 
                            return databaseGroups.addRatingsToGroup(group_id, i.key, i.assignee.accountId, pgScores.ISSUE)
                    })
                })
                .then(addedIssueObj => Promise.all(addedIssueObj))
                .then(ratings => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        ratings
                    )
                })
        },

        getRankings: function() {
            //TODO
        }*/
    }
    return serv;
}

module.exports = services;