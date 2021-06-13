'use strict'

function services(databaseGroup, databaseUsers, pgResponses) {
    const serv = {       

        countPointsInGroup: function(groupId) { 
            let usersInfoMap = new Map()
            let projectsMilestonesScores = []
            let projects = []
            let owner = undefined
            return databaseGroup.getGroupDetails(groupId)
            .then(group => {
                let membersInfo = []
                projects = group.projects
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
            .then(() => projects.map(project => { 
                return {
                    "id": project.id,
                    "title": project.title,
                    "type": project.type
                }
            }))
            .then(projects => {
                let promisses = []
                projects.forEach(project => { //TODO
                    const x = require("./plugins/" + project.type + "/ScoreCounter")
                    promisses.push(x.countPoints(project.id, usersInfoMap, owner)
                        .then(memberInfoMapGitlab => memberInfoMapGitlab.forEach(milestoneScore => {
                            projectsMilestonesScores.push(auxFunc(milestoneScore, project.type, project.title))
                        }))
                )})
                return Promise.all(promisses)
            })
            .then(() => console.log(projectsMilestonesScores))
            .then(() => {
                return pgResponses.setSuccessUri(
                    pgResponses.OK,
                    'groups/',
                    ""
                )   
            })
        }

    }
    return serv;
}

function auxFunc(milestoneScore, type, title){
    let toRet = {ProjectType: type, ProjectTitle:title, Milestone: milestoneScore.Milestone, Scores: new Map()}
    milestoneScore.Scores.forEach(info => {
        toRet.Scores.set(info.AppUsername,info.Points)
    })
    return toRet
}

module.exports = services;
