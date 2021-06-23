'use strict'

const URL = 'https://pluggable-gamification.atlassian.net'

const fetch = require('node-fetch');
const pgResponses = require('../../pg-responses');

var arrayMethods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
}

function makeFetch(uri, method, body, AToken) {
    let headers = {
        'Accept': 'application/json'
    }
    if(AToken){
        headers.Authorization = `Basic ${Buffer.from(
                `${AToken}`
            ).toString('base64')}`
    }

    return fetch(uri, {
        method: method,
        headers,
        body: body //Request body
    })
        .then(response => {
            if(response.status != pgResponses.OK) return Promise.reject(response);
            return response.json()
        })
}

function apiJira() {
    const jira = {
        validateProject: function(Pid, AToken) {
            let project = {}
            return makeFetch(`${URL}/rest/api/3/project/${Pid}`, arrayMethods.GET, null, AToken)
                .then(body => {
                    project = {
                        "id": body.id,
                        "owner_name": "",
                        "owner_id": "",
                        "description": body.description,
                        "avatar": body.avatarUrls,
                        "type": "Jira"
                    }
                    return this.getUserById(body.lead.accountId, AToken)
                })
                .then(id => project.owner_name = id)
                .then(() => project)
                .catch(error => pgResponses.resolveErrorApis(error));
        },

        getUserById: function(UId, AToken) {
            return makeFetch(`${URL}/rest/api/3/user?accountId=${UId}`, arrayMethods.GET, null, AToken)
                .then(body => body.emailAddress)
                .catch(error => pgResponses.resolveErrorApis(error));
        },

        getProjectsFromUsername: function(userName, AToken) {
            return makeFetch(`${URL}/rest/api/3/project`, arrayMethods.GET, null, AToken)
            .then(body => body.map(project =>{
                return {
                    "id": project.id,
                    "name": project.name
                }
            }))    
            .catch(error => pgResponses.resolveErrorApis(error))
                .catch(error => pgResponses.resolveErrorApis(error));
        },

        getIssues: function(Pid, AToken) {
            return makeFetch(`${URL}/rest/api/2/search?jql=project=${Pid}`, arrayMethods.GET, null, AToken)
                .then(body => {
                    let arrayIssues = []
                    body.issues.forEach(issue => arrayIssues.push({
                        "id": issue.id,
                        "title": issue.fields.summary,
                        "assigneeId": issue.fields.assignee.accountId,
                        "state": issue.fields.status,
                        "created_at": issue.fields.created,
                        "closed_at":issue.fields.resolutiondate,
                        "due_date": issue.fields.duedate
                    }))
                    return arrayIssues
                })
                .catch(error => pgResponses.resolveErrorApis(error));
        }
    }
    return jira;
}

module.exports = apiJira;
