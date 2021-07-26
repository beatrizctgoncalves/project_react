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
                    if(!groups){
                        return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_GROUPS_MSG);
                    }
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

        deleteGroup: function (group_id, requestUser) {
            return databaseGroups.getGroupDetails(group_id)
                .then(groupObj => {
                    if(groupObj.owner != requestUser) {
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_USER_NOT_OWNER
                        )
                    }
                    let promisses = []
                    groupObj.members.forEach( member => {
                        if(member != groupObj.owner){
                            promisses.push(databaseUsers.removeMemberGroup(member,group_id))
                        }
                    })
                    return Promise.all(promisses)
                })
                .then(() => databaseGroups.deleteGroup(group_id))
                .then(group => {
                    return pgResponses.setSuccessUri(
                        pgResponses.OK,
                        pgResponses.index.api,
                        pgResponses.index.groups,
                        group
                    )
                })
        },

        editGroup: function (group_id, new_name, new_desc, requestUser) {
            var regExp = /[a-zA-Z]/g;
            if (!regExp.test(new_name)) {  //verify if new_name has a string
                return pgResponses.setError(
                    pgResponses.BAD_REQUEST,
                    pgResponses.BAD_REQUEST_MSG
                )
            } else {
                return databaseGroups.getGroupDetails(group_id)
                .then(groupObj => {
                    if(groupObj.owner != requestUser) {
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_USER_NOT_OWNER
                        )
                    }
                })
                .then(databaseGroups.editGroup(group_id, new_name, new_desc))
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

        getProjectFromGroup: function (group_id, PURL, Pid) {
            return databaseGroups.getGroupDetails(group_id)
                .then(group => {
                    let project = group.projects.find(p => p.URL == PURL && p.id == Pid)
                    if (!project) {
                        return pgResponses.setError(
                            pgResponses.NOT_FOUND,
                            pgResponses.NOT_FOUND_PROJECT_MSG
                        )
                    }
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        project
                    )
                })
        },

        addProjectToGroup: function (group_id, Pid, PURL, ownerCredentials, type, requestUser) {
            const x = require("../plugins/" + type + "/api")()
            return x.validateProject(PURL, Pid, ownerCredentials)
                .then(validatedObj => {
                    return databaseGroups.getGroupDetails(group_id)
                        .then(groupObj => {
                            if(groupObj.owner != requestUser) {
                                return pgResponses.setError(
                                    pgResponses.FORBIDDEN,
                                    pgResponses.FORBIDDEN_USER_NOT_OWNER
                                )
                            }
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

        removeProjectFromGroup: function (group_id, PURL, project_id, requestUser) {
            return databaseGroups.getGroupDetails(group_id)
                .then(groupObj => {
                    if(groupObj.owner != requestUser) {
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_USER_NOT_OWNER
                        )
                    }
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

        removeSprintFromGroup: function (group_id, title, requestUser) {
            return databaseGroups.getGroupDetails(group_id)
                .then(groupObj => {
                    if(groupObj.owner != requestUser) {
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_USER_NOT_OWNER
                        )
                    }
                    const sprint_index = groupObj.sprints.findIndex(s => s.title == title)
                    if (sprint_index == -1) {
                        return pgResponses.setError(
                            pgResponses.NOT_FOUND,
                            pgResponses.NOT_FOUND_SPRINT_MSG
                        );
                    }
                    return databaseGroups.removeSprintFromGroup(group_id, sprint_index)
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

        removeTaskFromGroup: function (group_id, title, requestUser) {
            return databaseGroups.getGroupDetails(group_id)
                .then(groupObj => {
                    if(groupObj.owner != requestUser) {
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_USER_NOT_OWNER
                        )
                    }
                    const task_index = groupObj.tasks.findIndex(t => t.title == title)
                    if (task_index == -1) {
                        return pgResponses.setError(
                            pgResponses.NOT_FOUND,
                            pgResponses.NOT_FOUND_TASK_MSG
                        );
                    }
                    return databaseGroups.removeTaskFromGroup(group_id, task_index)
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

        addMemberToGroup: function (group_id, username, requestUser) {
            return databaseUsers.getUser(username) //check if the user exists
                .then(userObj => {
                    return databaseGroups.getGroupDetails(group_id) //check if the group exists
                        .then(groupObj => {
                            if(groupObj.owner != requestUser) {
                                return pgResponses.setError(
                                    pgResponses.FORBIDDEN,
                                    pgResponses.FORBIDDEN_USER_NOT_OWNER
                                )
                            }
                            const userExists = groupObj.members.findIndex(m => m == username)
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

        addMemberInfoToProject: function (group_id, project_URL, project_id, username, memberCredentials, requestUser) {
            return databaseUsers.getUser(username) //check if the user exists
                .then(userObj => {
                    return databaseGroups.getGroupDetails(group_id) //check if the group exists
                        .then(groupObj => {
                            const project_index = groupObj.projects.findIndex(p => p.id == project_id && p.URL == project_URL)
                            const userExists = groupObj.members.findIndex(m => m == username)
                            if (userExists == -1 || project_index == -1) {
                                return pgResponses.setError(
                                    pgResponses.NOT_FOUND,
                                    pgResponses.NOT_FOUND_USER_PROJECT_MSG
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

        removeMemberFromGroup: function (group_id, username, requestUser) {
            return databaseGroups.getGroupDetails(group_id) //check if the group exists
                .then(groupObj => {
                    if(groupObj.owner != requestUser) {
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_USER_NOT_OWNER
                        )
                    }
                    const user_index = groupObj.members.findIndex(member => member == username)  //get the user's index
                    if (user_index == -1) { 
                        return pgResponses.setError( //the user doesnt exist in the group
                            pgResponses.NOT_FOUND,
                            pgResponses.NOT_FOUND_USER_MSG
                        );
                    }
                    return databaseUsers.removeMemberGroup(username, group_id)
                        .then(() => {
                            let promisses =[]
                            groupObj.projects.forEach((project,i) => {
                                let user_project_index = project.memberCredentials.findIndex(mc => mc.AppUsername == username)
                                
                                if(user_project_index != -1){
                                    promisses.push(databaseGroups.removeMemberInfoFromProject(group_id,i,user_project_index))
                                }
                            })
                            return Promise.all(promisses)
                        })
                        .then(() => {
                            let promisses =[]
                            groupObj.tasks.forEach((task,i) => {
                                let user_task_index = task.members.findIndex(m => m == username)
                                
                                if(user_task_index != -1){
                                    promisses.push(databaseGroups.removeMembeFromTask(group_id,i,user_task_index))
                                }
                            })
                            return Promise.all(promisses)
                        })
                        .then(() => databaseGroups.removeMemberFromGroup(group_id, user_index)) //remove the user by index
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

        addSprintToGroup: function (group_id, title, beginDate, endDate, requestUser) {
            return databaseGroups.getGroupDetails(group_id) //check if the group exists
                .then(groupObj => {
                    if(groupObj.owner != requestUser) {
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_USER_NOT_OWNER
                        )
                    }
                    const sprintExists = groupObj.sprints.findIndex(s => s.title == title)
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

        addTaskToGroup: function (group_id, title, date, points, requestUser) {
            return databaseGroups.getGroupDetails(group_id) //check if the group exists
                .then(groupObj => {
                    if(groupObj.owner != requestUser) {
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_USER_NOT_OWNER
                        )
                    }
                    const taskExists = groupObj.tasks.findIndex(t => t.title == title)
                    if (taskExists != -1) {  //check if the task already exists in the group
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_TASK_MSG
                        )
                    }
                    if(!Number.isInteger(points) || points < 0){
                        return pgResponses.setError(
                            pgResponses.BAD_REQUEST,
                            pgResponses.BAD_REQUEST_MSG_POINTS
                        )
                    }
                    return databaseGroups.addTaskToGroup(group_id, title, date, points) //add task
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

        updateTaskFromGroup: function (group_id, title, updatedInfo, requestUser) {
            return databaseGroups.getGroupDetails(group_id) //check if the group exists
                .then(groupObj => {
                    if(groupObj.owner != requestUser) {
                        return pgResponses.setError(
                            pgResponses.FORBIDDEN,
                            pgResponses.FORBIDDEN_USER_NOT_OWNER
                        )
                    }
                    const taskIndex = groupObj.tasks.findIndex(t => t.title == title)
                    if (taskIndex == -1) {  //check if the task doesn't exists in the group
                        return pgResponses.setError(
                            pgResponses.NOT_FOUND,
                            pgResponses.NOT_FOUND_TASK_MSG
                        )
                    }
                    if (updatedInfo.member) {
                        if (!groupObj.members.find(m => m == updatedInfo.member)) {
                            return pgResponses.setError(
                                pgResponses.NOT_FOUND,
                                pgResponses.NOT_FOUND_USER_TASK_MSG
                            )
                        }
                        if (groupObj.tasks[taskIndex].members.find(m => m == updatedInfo.member)) {
                            return pgResponses.setError(
                                pgResponses.FORBIDDEN,
                                pgResponses.FORBIDDEN_TASK_USER_MSG
                            )
                        }
                    }
                    if(updatedInfo.points && (!Number.isInteger(updatedInfo.points) || updatedInfo.points < 0)){
                        return pgResponses.setError(
                            pgResponses.BAD_REQUEST,
                            pgResponses.BAD_REQUEST_MSG_POINTS
                        )
                    }

                    return databaseGroups.updateTaskFromGroup(group_id, taskIndex, updatedInfo)
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
    }
    return serv;
}

module.exports = services;