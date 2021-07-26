'use strict'

function services(databaseGroup, pgResponses) {
    const serv = {

        getProjectsOfTool: function (toolName, PURL, ownerCredentials) {
            let api = undefined
            try {
                api = require("../plugins/" + toolName + "/api")()
            } catch (error) {
                return pgResponses.setError(
                    pgResponses.NOT_FOUND,
                    pgResponses.NOT_FOUND_TOOL_MSG
                )
            }
            return api.getProjectsFromUsername(PURL, ownerCredentials.accountId, ownerCredentials.AToken)
                .then(projects => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        projects
                    )
                })
        },

        countPointsInGroup: function (groupId) {
            let projects = []
            let sprints = []
            let tasks = []
            let tasksPoints = []
            let SprintScores = []
            let owner = undefined
            return databaseGroup.getGroupDetails(groupId)
                .then(group => {
                    projects = group.projects
                    sprints = group.sprints
                    owner = group.owner
                    tasks = group.tasks
                })
                .then(() => {
                    let promisses = []
                    sprints.forEach(sprint => {
                        projects.forEach(project => {
                            let usersInfoMap = new Map()
                            usersInfoMap.set(owner, {
                                "info": project.ownerCredentials,
                                "Points": 0
                            })

                            if (project.memberCredentials && project.memberCredentials.length) {
                                project.memberCredentials.forEach(mC => {
                                    usersInfoMap.set(mC.AppUsername, {
                                        "info": mC,
                                        "Points": 0
                                    })
                                })
                            }

                            const x = require("../plugins/" + project.type + "/ScoreCounter")
                            promisses.push(x.countPoints(project.URL, project.id, usersInfoMap, owner, sprint.beginDate, sprint.endDate)
                                .then(memberInfoMap => SprintScores.push(auxFunc(memberInfoMap, sprint.title)))
                            )
                        })

                        tasks.forEach(task => {
                            if (checkDate(task.date, sprint.beginDate, sprint.endDate)) {
                                let usersInfoTask = { SprintTitle: sprint.title, Scores: [] }
                                if (task.members) {
                                    task.members.forEach(m => {
                                        usersInfoTask.Scores.push({ AppUsername: m, Points: parseInt(task.points) })
                                    })
                                }
                                tasksPoints.push(usersInfoTask)
                            }
                        })


                    })
                    return Promise.all(promisses)
                })
                .then(() => SprintScores = SprintScores.concat(tasksPoints))
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

function auxFunc(memberInfoMap, title) {
    let toRet = { SprintTitle: title, Scores: [] }

    memberInfoMap.forEach(info => {
        toRet.Scores.push({ AppUsername: info.AppUsername, Points: info.Points })
    })
    return toRet
}

function checkDate(taskBeginDate, beginDate, endDate) {
    if (!beginDate || !endDate)
        return true
    return taskBeginDate >= beginDate && taskBeginDate <= endDate
}

function MergeProjectsInSprint(SprintScores) {
    let toRet = []
    SprintScores.forEach(sprintScore => {
        let value = toRet.find(v => v.SprintTitle == sprintScore.SprintTitle)
        if (!value) {
            toRet.push(sprintScore)
        } else {
            sprintScore.Scores.forEach(Score => {
                let p = value.Scores.find(v => v.AppUsername == Score.AppUsername)
                if (p) {
                    p.Points += Score.Points
                } else {
                    value.Scores.push({ AppUsername: Score.AppUsername, Points: Score.Points })
                }
            })
        }
    })

    return toRet
}

module.exports = services;
