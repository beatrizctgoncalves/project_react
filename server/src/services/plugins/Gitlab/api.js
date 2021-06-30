'use strict'

const URL = 'https://gitlab.com/api/v4/'

const fetch = require('node-fetch');
const pgResponses = require('../../pg-responses');

function makeRequest(PURL, URI) {
    return fetch(`${PURL}${URI}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if(response.status != pgResponses.OK) return Promise.reject(response);
        return response.json()
    })
}

function apiGitlab() {
    const gitlab = {
        validateProject: function(PURL, Pid, ownerCredentials) {
            return makeRequest(PURL,`projects/${Pid}?access_token=${ownerCredentials.AToken}`)
                .then(body => {
                    return {
                        "id": body.id,
                        "owner_name": body.owner.username,
                        "owner_id": body.owner.id,
                        "title": body.name,
                        "description": body.description,
                        "avatar": body.avatar_url,
                        "type": "Gitlab",
                        "URL": PURL,
                        "ownerCredentials": ownerCredentials,
                        "memberCredentials": []
                    }
                })
                .catch(error => pgResponses.resolveErrorApis(error))
        },

        getUserId: function(PURL, username) {
            return makeRequest(PURL, `users?username=${username}`)
                .then(user => user[0].id)
                .catch(error => pgResponses.resolveErrorApis(error))
        },
        
        getProjectsFromUserId: function(PURL, Uid, AToken) {
            return makeRequest(PURL, `users/${Uid}/projects?access_token=${AToken}`)
            .then(body => body.map(project =>{
                return {
                    "id": project.id,
                    "title": project.name
                }
            }))    
            .catch(error => pgResponses.resolveErrorApis(error))
        },

        getProjectsFromUsername: function(PURL, userName, AToken) {
            return this.getUserId(PURL, userName)
                .then(uId => this.getProjectsFromUserId(PURL, uId,AToken))
        },

        getIssues: function(PURL, PId, AToken) {
            return makeRequest(PURL, `projects/${PId}/issues?access_token=${AToken}`)
                .then(issues => issues.map(issue => {
                    return {
                        "id" : issue.id, 
                        "title" : issue.title, 
                        "state": issue.state,
                        "closed_at":issue.closed_at,
                        "assignees":issue.assignees.map(assignee => assignee.username),
                        "upvotes": issue.upvotes,
                        "downvotes": issue.downvotes,
                        "due_date": issue.due_date,
                        "created_at": issue.created_at
                    }
                }))
                .catch(error => pgResponses.resolveErrorApis(error));
        },

        getMilestones: function(PURL, PId, AToken) {
            return makeRequest(PURL, `projects/${PId}/milestones?access_token=${AToken}`)
                .then(milestones => milestones.map(milestone => {
                    return {
                        "id" : milestone.id, 
                        "title" : milestone.title, 
                        "start_date": milestone.start_date,
                        "due_date": milestone.due_date 
                    }
                }))
                .catch(error => pgResponses.resolveErrorApis(error));
        },

        getIssuesFromMilestone: function(PURL, PId, MId, AToken) {
            return makeRequest(PURL, `projects/${PId}/milestones/${MId}/issues?access_token=${AToken}`)
                .then(issues => issues.map(issue => {
                    return {
                        "id" : issue.id, 
                        "title" : issue.title, 
                        "state": issue.state,
                        "closed_at":issue.closed_at,
                        "assignees":issue.assignees.map(assignee => assignee.username),
                        "upvotes": issue.upvotes,
                        "downvotes": issue.downvotes,
                        "due_date": issue.due_date,
                        "created_at": issue.created_at
                    }
                }))
                .catch(error => pgResponses.resolveErrorApis(error));
        }
    }
    return gitlab;
}

module.exports = apiGitlab;
