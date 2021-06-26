'use strict'

const URL = 'https://gitlab.com/api/v4/'

const fetch = require('node-fetch');
const pgResponses = require('../../pg-responses');

function makeRequest(URI) {
    return fetch(`${URL}${URI}`, {
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
        validateProject: function(Pid, AToken) {
            return makeRequest(`projects/${Pid}?access_token=${AToken}`)
                .then(body => {
                    return {
                        "id": body.id,
                        "owner_name": body.owner.username,
                        "owner_id": body.owner.id,
                        "title": body.name,
                        "description": body.description,
                        "avatar": body.avatar_url,
                        "type": "Gitlab"
                    }
                })
                .catch(error => pgResponses.resolveErrorApis(error))
        },

        getUserId: function(username) {
            return makeRequest(`users?username=${username}`)
                .then(user => user[0].id)
                .catch(error => pgResponses.resolveErrorApis(error))
        },
        
        getProjectsFromUserId: function(Uid, AToken) {
            return makeRequest(`users/${Uid}/projects?access_token=${AToken}`)
            .then(body => body.map(project =>{
                return {
                    "id": project.id,
                    "title": project.name
                }
            }))    
            .catch(error => pgResponses.resolveErrorApis(error))
        },

        getProjectsFromUsername: function(userName, AToken) {
            return this.getUserId(userName)
                .then(uId => this.getProjectsFromUserId(uId,AToken))
        },

        getIssues: function(PId, AToken) {
            return makeRequest(`projects/${PId}/issues?access_token=${AToken}`)
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

        getMilestones: function(PId, AToken) {
            return makeRequest(`projects/${PId}/milestones?access_token=${AToken}`)
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

        getIssuesFromMilestone: function(PId, MId, AToken) {
            return makeRequest(`projects/${PId}/milestones/${MId}/issues?access_token=${AToken}`)
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
