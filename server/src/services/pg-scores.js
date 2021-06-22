'use strict'

function services(databaseGroup, databaseUsers, pgResponses) {
    const serv = {       

        countPointsInGroup: function(groupId) { //TODO
            let usersInfoMap = new Map()
            let projects = []
            let sprints = []            
            let SprintScores = []
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
                sprints.forEach(sprint => {
                    projects.forEach(project => { 
                        const x = require("./plugins/" + project.type + "/ScoreCounter")
                        promisses.push(x.countPoints(project.id, usersInfoMap, owner, sprint.beginDate, sprint.endDate)
                            .then(memberInfoMap => SprintScores.push(auxFunc(memberInfoMap, sprint.title)))
                    )})
                })
                return Promise.all(promisses)
            })
            .then(() => SprintScores = MergeProjectsInSprint(SprintScores))
            .then(() => {
                return pgResponses.setSuccessList(
                    pgResponses.OK,
                    SprintScores
                )
            })
        }

    }
    return serv;
}

function auxFunc(memberInfoMapGitlab, title){
    let toRet = {SprintTitle:title, Scores: []}

    memberInfoMapGitlab.forEach(info => {
        toRet.Scores.push({AppUsername:info.AppUsername, Points:info.Points})
    })
    return toRet
}

function MergeProjectsInSprint(SprintScores){
    let toRet = []
    SprintScores.forEach(sprintScore => {
        let value = toRet.find(v => v.SprintTitle == sprintScore.SprintTitle)
        if (!value){
            toRet.push(sprintScore)
        }else{
            sprintScore.Scores.forEach(Score => {
                let p = value.Scores.find(v => v.AppUsername == Score.AppUsername)
                if(p){
                    p.Points += Score.Points
                }else{
                    value.Scores.push({ AppUsername: Score.AppUsername, Points: Score.Points })
                }
            })
        }
    })

    return toRet
}

module.exports = services;
