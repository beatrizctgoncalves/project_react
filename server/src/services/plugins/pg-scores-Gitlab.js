'use strict'

module.exports = {
    countPoints: function(Pid, userInfoMap, owner, requests, pgResponses) {
        const ApiGitlab = require("../../apis/api-Gitlab")(requests, pgResponses)
        let AToken = userInfoMap.get(owner).info
        AToken = AToken.filter(info => info.type == "Gitlab")[0].AToken
        let memberInfoMapGitlab = new Map()
        Array.from(userInfoMap, ([key, value]) => {
            value.info.forEach(info => {
                if(info.type == "Gitlab")
                    memberInfoMapGitlab.set(info.username, {"AppUsername" : key, "Points" : 0 })
            })
        })

        return ApiGitlab.getIssues(Pid,AToken)
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
                return memberInfoMapGitlab
            })
    }
}