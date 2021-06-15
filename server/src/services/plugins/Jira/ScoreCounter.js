'use strict'

module.exports = {
    countPoints: function(Pid, userInfoMap, owner, beginDate, endDate) {
        const ApiJira = require("./api")()
        let AToken = userInfoMap.get(owner).info
        AToken = AToken.filter(info => info.type == "Jira")[0].AToken
        let memberInfoMapJira = new Map()
        Array.from(userInfoMap, ([key, value]) => {
            value.info.forEach(info => {
                if(info.type == "Jira")
                    memberInfoMapJira.set(info.accountId, {"AppUsername" : key, "Points" : 0 })
            })
        })
        return ApiJira.getIssues(Pid,AToken)
            .then(issues => {
                issues.forEach(issue => {
                    if(checkDate(issue.created_at, beginDate, endDate)){
                        let Points = 0
                        if(issue.closed_at)
                            Points += 10
                        if(issue.due_date && issue.closed_at && issue.closed_at.slice(0,10)>issue.due_date)
                            Points -=5
                        if(memberInfoMapJira.has(issue.assigneeId)){
                            let aux = memberInfoMapJira.get(issue.assigneeId)
                            aux.Points += Points
                            memberInfoMapJira.set(issue.assigneeId,aux)
                        }
                    }
                })
                return memberInfoMapJira
            })
    }
}

function checkDate(issueOpen, beginDate, endDate){
    if(!beginDate || !endDate)
        return true
    return issueOpen.slice(0,10) >= beginDate && issueOpen <= endDate
}