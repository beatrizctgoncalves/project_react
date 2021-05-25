'use strict'

function services(databaseGroup, databaseUsers, requests, pgResponses) {
    const serv = {       

        countPointsInGroup: function(groupId) { //TODO
            let usersInfoMap = []
            let projects = []
            let owner = undefined
            databaseGroup.getGroupDetails(groupId)
            .then(group => {
                let membersInfo = []
                projects = group.projects
                owner = group.owner
                group.members.forEach(member =>{
                    membersInfo.push(databaseUsers.getUser(member)
                        .then(user => usersInfoMap.push({
                            "username": user.username,
                            "info" : user.info
                        }))
                    )  
                })
                return Promise.all(membersInfo)
            })
            .then(() => projects.map(project => { 
                return {
                    "id": project.id,
                    "type": project.type
                }
            }))
            .then(projects => projects.forEach(project => { //TODO
                const x = require("./plugins/pg-scores-" + project.type)
                x.countPoints(project.id, usersInfoMap, owner, requests, pgResponses)
            }))
        }

    }
    return serv;
}

module.exports = services;
