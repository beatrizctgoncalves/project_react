'use strict'


function apiGitlab(requests, pgResponses) {
    const gitlab = {
        validateProject: function(Pid, AToken) {
            return requests.makeRequestGitLab(`projects/${Pid}?access_token=${AToken}`)
                .then(body => {
                    return {
                        "id": body.id,
                        "owner_name": body.owner.username,
                        "owner_id": body.owner.id,
                        "description": body.description,
                        "avatar": body.avatar_url,
                        "type": "Gitlab"
                    }
                })
                .catch(error => pgResponses.resolveErrorApis(error))
        },

        getUserId: function(username) {
            return requests.makeRequestGitLab(`users?username=${username}`)
                .then(user => user[0].id)
                .catch(error => pgResponses.resolveErrorApis(error))
        },
        
        getProjectsFromUser: function(Uid, AToken) {
            return requests.makeRequestGitLab(`users/${Uid}/projects?access_token=${AToken}`)
            .then(body => body.map(project =>{
                return {
                    "id": project.id,
                    "owner_name": project.owner.username,
                    "owner_id": project.owner.id,
                    "description": project.description,
                    "avatar": project.avatar_url,
                    "type": "Gitlab"
                }
            }))    
            .catch(error => pgResponses.resolveErrorApis(error))
        },
        
        getIssues: function(PId, AToken) {
            return requests.makeRequestGitLab(`projects/${PId}/issues?access_token=${AToken}`)
                .then(issues => issues.map(issue => {
                    return {
                        "id" : issue.id, 
                        "title" : issue.title, 
                        "state": issue.state,
                        "closed_at":issue.closed_at,
                        "assignees":issue.assignees.map(assignee => assignee.username),
                        "upvotes": issue.upvotes,
                        "downvotes": issue.downvotes,
                        "due_date": issue.due_date 
                    }
                }))
                .catch(error => pgResponses.resolveErrorApis(error));
        }
    }
    return gitlab;
}

module.exports = apiGitlab;
