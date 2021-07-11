'use strict'


function database(pgResponses, requests) {
    const dt = {
        createGroup: function (owner, group_name, group_description) {
            var requestBody = JSON.stringify({
                "owner": owner,
                "name": group_name,
                "description": group_description,
                "members": [owner],
                "sprints": [],
                "tasks": [],
                "projects": []
            })
            return requests.makeFetchElastic(requests.index.groups.concat('_doc'), requests.arrayMethods.POST, requestBody)
                .then(body => {
                    if (!body.error) return body._id
                    else return pgResponses.setError(pgResponses.DB_ERROR)
                })
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        getUserGroups: function (owner) {
            return requests.makeFetchElastic(requests.index.groups.concat(`_search?q=owner:${owner}`), requests.arrayMethods.POST, null)
                .then(body => {
                    if (body.hits && body.hits.hits.length) {
                        return body.hits.hits.map(hit => {
                            hit._source.id = hit._id;
                            return hit._source;
                        })
                    } else {
                        return undefined
                    }
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        },

        getGroupDetails: function (id) {
            return requests.makeFetchElastic(requests.index.groups.concat(`_doc/${id}`), requests.arrayMethods.GET, null)
                .then(body => {
                    if (body.found) {
                        body._source.id = body._id;
                        return body._source;
                    } else {
                        return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_GROUP_MSG);
                    }
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        },

        deleteGroup: function (group_id) {
            return requests.makeFetchElastic(requests.index.groups.concat(`_doc/${group_id}?refresh=true`), requests.arrayMethods.DELETE, null)
                .then(body => {
                    if (body.result == 'deleted') return body._id
                    else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_GROUP_MSG)
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        },

        editGroup: function (group_id, new_name, new_desc) {
            var requestBody = JSON.stringify({
                "script": {
                    "source": "ctx._source.name = params.name; ctx._source.description = params.description",
                    "params": {
                        "name": `${new_name}`,
                        "description": `${new_desc}`
                    }
                }
            });

            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(body => {
                    if (body.result == 'updated') {
                        return body._id;
                    } else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_GROUP_MSG);
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        },

        addMemberInfoToProject: function (group_id, project_index, username, memberCredentials) {
            return this.getGroupDetails(group_id)
                .then(group => {
                    let projects = group.projects
                    let memberCredentialsIndex = projects[project_index].memberCredentials.findIndex(mC => mC.AppUsername == username)
                    
                    if(memberCredentialsIndex !== -1){
                        projects[project_index].memberCredentials[memberCredentialsIndex] = memberCredentials
                    }
                    else{
                        projects[project_index].memberCredentials.push(memberCredentials)
                    }
                    return projects
                })
                .then(projects => {
                    var requestBody = JSON.stringify({
                        "script": {
                            "lang": "painless",
                            "inline": `ctx._source.projects = params.projects`,
                            "params": {
                                "projects": projects
                            }
                        }
                    });
                    return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                })
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        addProjectToGroup: function (group_id, information) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.projects.add(params.projects)",
                    "params": {
                        "projects": {
                            "id": information.id,
                            "owner_name": information.owner_name,
                            "ownerId": information.owner_id,
                            "title": information.title,
                            "description": information.description,
                            "avatar": information.avatar,
                            "type": information.type,
                            "URL": information.URL,
                            "ownerCredentials": information.ownerCredentials,
                            "memberCredentials": information.memberCredentials
                        }
                    }
                }
            });

            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch((err) => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        removeProjectFromGroup: function (group_id, project_index) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.projects.remove(params.project)",
                    "params": {
                        "project": project_index
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        removeSprintFromGroup: function (group_id, sprint_index) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.sprints.remove(params.sprint)",
                    "params": {
                        "sprint": sprint_index
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        removeTaskFromGroup: function (group_id, task_index) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.tasks.remove(params.task)",
                    "params": {
                        "task": task_index
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        removeMembeFromTask: function (group_id, task_index, user_index) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": `ctx._source.tasks[${task_index}].members.remove(params.user)`,
                    "params": {
                        "user": user_index
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        addMemberToGroup: function (group_id, username) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.members.add(params.members)",
                    "params": {
                        "members": username
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        removeMemberFromGroup: function (group_id, user_index) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.members.remove(params.user)",
                    "params": {
                        "user": user_index
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        removeMemberInfoFromProject: function (group_id, project_index, user_index) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": `ctx._source.projects[${project_index}].memberCredentials.remove(params.user)`,
                    "params": {
                        "user": user_index
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        addSprintToGroup: function (group_id, title, beginDate, endDate) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.sprints.add(params.sprint)",
                    "params": {
                        "sprint": {
                            "title": title,
                            "beginDate": beginDate,
                            "endDate": endDate
                        }
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        addTaskToGroup: function (group_id, title, date, points) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.tasks.add(params.task)",
                    "params": {
                        "task": {
                            "title": title,
                            "date": date,
                            "members": [],
                            "points": points
                        }
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), requests.arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },

        updateTaskFromGroup: function (group_id, taskIndex, updatedInfo) {
            var requestBody = JSON.stringify({
                "script": {
                    "source": `if(params.member != null) ctx._source.tasks[${taskIndex}].members.add(params.member); ` +
                        `if(params.points != null) ctx._source.tasks[${taskIndex}].points = params.points; `,
                    "params": updatedInfo
                }
            });

            return this.getGroupDetails(group_id)
                .then(groupObj => {
                    return requests.makeFetchElastic(requests.index.groups.concat(`_update/${groupObj.id}`), requests.arrayMethods.POST, requestBody)
                        .then(body => {
                            if (body.result == 'updated') {
                                return body._id;
                            } else {
                                return pgResponses.setError(pgResponses.BAD_REQUEST, pgResponses.BAD_REQUEST_MSG);
                            }
                        })
                })
                .catch(error => pgResponses.resolveErrorElastic(error))
        },

        addRatingsToGroup: function (group_id, key, accountId, score) {
            var requestBody = JSON.stringify({
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.ratings.add(params.ratings)",
                    "params": {
                        "ratings": {
                            "key": key,
                            "assignee_id": accountId,
                            "score": score
                        }
                    }
                }
            });
            return requests.makeFetchElastic(requests.index.groups.concat(`_update/${group_id}`), arrayMethods.POST, requestBody)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => body._id)
                .catch(() => pgResponses.setError(pgResponses.DB_ERROR, pgResponses.DB_ERROR_MSG))
        },
        
        removeGroup: function (group_id) {
            return requests.makeFetchElastic(requests.index.users.concat(`_doc/${group_id}`), requests.arrayMethods.DELETE, null)
                .then(resp => {
                    if(resp.error) throw resp
                    return resp
                })    
                .then(body => {
                    if (body.result == 'deleted') return body.username;
                    else return pgResponses.setError(pgResponses.NOT_FOUND, pgResponses.NOT_FOUND_GROUP_MSG);
                })
                .catch(error => pgResponses.resolveErrorElastic(error));
        }
    }
    return dt;
}

module.exports = database;