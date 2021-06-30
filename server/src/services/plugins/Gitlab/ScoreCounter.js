'use strict'

module.exports = {
    countPoints: function(PURL, Pid, userInfoMap, owner, beginDate, endDate) {
        const ApiGitlab = require("./api")()
        let AToken = userInfoMap.get(owner).info.AToken
        let memberInfoMapGitlab = new Map()
        Array.from(userInfoMap, ([key, value]) => {
            memberInfoMapGitlab.set(value.info.accountId, {"AppUsername" : key, "Points" : 0 })
        })
        return ApiGitlab.getIssues(PURL, Pid,AToken)
            .then(issues => {
                issues.forEach(issue => {
                    if(checkDate(issue.created_at, beginDate, endDate)){
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
                    }
                })
                return memberInfoMapGitlab
            })
    }
}

function checkDate(issueOpen, beginDate, endDate){
    if(!beginDate || !endDate)
        return true
    return issueOpen.slice(0,10) >= beginDate && issueOpen <= endDate
}