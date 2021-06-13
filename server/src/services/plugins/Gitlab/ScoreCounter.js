'use strict'

const ApiGitlab = require("./api")()

module.exports = {
    countPointsSingleMilestone: function(Pid, MId, MTitle, userInfoMap, AToken) {
        let memberInfoMapGitlab = new Map()
        Array.from(userInfoMap, ([key, value]) => {
            value.info.forEach(info => {
                if(info.type == "Gitlab")
                    memberInfoMapGitlab.set(info.username, {"AppUsername" : key, "Points" : 0 })
            })
        })

        return ApiGitlab.getIssuesFromMilestone(Pid,MId,AToken)
            .then(issues => {
                issues.forEach(issue => {
                    let Points = 0
                    if(issue.closed_at)
                        Points += 10
                    if(issue.due_date && issue.closed_at && issue.closed_at.slice(0,10)>issue.due_date)
                        Points -=5
                    issue.assignees.forEach(assignee => {
                        if(memberInfoMapGitlab.has(assignee)){
                            let aux = memberInfoMapGitlab.get(assignee)
                            aux.Points += Points
                            memberInfoMapGitlab.set(assignee,aux)
                        }
                    })
                })
                return {Milestone:MTitle, Scores:memberInfoMapGitlab}
            })
    },

    countPoints: function(Pid, userInfoMap, owner){
        let AToken = userInfoMap.get(owner).info
        AToken = AToken.filter(info => info.type == "Gitlab")[0].AToken

        return ApiGitlab.getMilestones(Pid,AToken)
            .then(milestones => {
                let milestonesIssuesPoints = []
                milestones.forEach(milestone => {
                    milestonesIssuesPoints.push(this.countPointsSingleMilestone(Pid, milestone.id, milestone.title, userInfoMap, AToken))
                })
                return milestonesIssuesPoints
            })
            .then(milestonesIssuesPoints => Promise.all(milestonesIssuesPoints))
    }

}