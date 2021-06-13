'use strict'

function services(databaseGroup, databaseUsers, pgResponses) {
    const serv = {       

        countPointsInGroup: function(groupId) { //TODO
            let usersInfoMap = new Map()
            let projects = []
            let sprints = []
            let owner = undefined
            return databaseGroup.getGroupDetails(groupId)
            .then(group => {
                let membersInfo = []
                projects = group.projects.map(project => { 
                    return {
                        "id": project.id,
                        "type": project.type
                    }
                })
                sprints = group.sprints
                owner = group.owner
                group.members.forEach(member =>{
                    membersInfo.push(databaseUsers.getUser(member)
                        .then(user => usersInfoMap.set(user.username,{
                            "info" : user.info,
                            "Points" : 0
                        }))
                    )  
                })
                return Promise.all(membersInfo)
            })
            .then(() => {
                let promisses = []
                projects.forEach(project => { //TODO
                    const x = require("./plugins/" + project.type + "/ScoreCounter")
                    promisses.push(x.countPoints(project.id, usersInfoMap, owner)
                        .then(memberInfoMapGitlab => memberInfoMapGitlab.forEach(info => {
                            let aux = usersInfoMap.get(info.AppUsername)
                            aux.Points += info.Points
                            usersInfoMap.set(info.AppUsername,aux)
                        }))
                )})
                return Promise.all(promisses)
            })
            .then(() => console.log(usersInfoMap))
            .then(() => {
                return pgResponses.setSuccessUri(
                    pgResponses.OK,
                    'groups/',
                    "",
                    ""
                )   
            })
        }

    }
    return serv;
}

module.exports = services;
