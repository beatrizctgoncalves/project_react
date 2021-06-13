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
                        "owner_id": body.lead.accountId,
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

        getIssues: function(Pid, AToken) {
            return makeFetch(`${URL}/rest/api/2/search?jql=project=${Pid}`, arrayMethods.GET, null, AToken)
                .then(body => {
                    let arrayIssues = []
                    body.issues.forEach(issue => arrayIssues.push({
                        "id": issue.id,
                        "key": issue.key,
                        "issuetype_name": issue.fields.issuetype.name,
                        "issuetype_iconUrl": issue.fields.issuetype.iconUrl,
                        "summary": issue.fields.summary,
                        "priority_name": issue.fields.priority.name,
                        "priority_id": issue.fields.priority.id,
                        "assignee": issue.fields.assignee,
                        "reporter": issue.fields.reporter.accountId,
                        "state": issue.fields.status,
                        "created": issue.fields.created,
                        "project_id": issue.fields.project.id,
                        "project_name": issue.fields.project.name
                    }))
                    return arrayIssues
                })
                .catch(error => pgResponses.resolveErrorApis(error));
        }
    }
    return jira;
}

module.exports = apiJira;
