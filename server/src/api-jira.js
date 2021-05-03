'use strict'

const fetch = require('node-fetch');
const pgResponses = require('./pg-responses');

var arrayMethods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
}

function makeFetch(uri, method, body, email, token) {
    return fetch(uri, {
        method: method,
        headers: {
            'Authorization': `Basic ${Buffer.from(
                `${email}:${token}`
            ).toString('base64')}`,
            'Accept': 'application/json'
        },
        body: body //Request body
    })
        .then(response => {
            if(response.status != pgResponses.OK) return Promise.reject(response);
            return response.json()
        })
}

module.exports = {
    validateProject: function(url, email, token, key) {
        return makeFetch(`${url}/rest/api/3/project/${key}?expand=lead`, arrayMethods.GET, null, email, token)
            .then(body => {
                return {
                    "key": key,
                    "lead_self": body.lead.self,
                    "lead_id": body.lead.accountId,
                    "description": body.description,
                    "avatar": body.avatarUrls,
                    "projectTypeKey": body.projectTypeKey,
                    "type": "jira"
                }
            })
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, pgResponses.NOT_FOUND_PROJECT_MSG);
                else if(error.status == pgResponses.FORBIDDEN) return pgResponses.setError(error.status, pgResponses.FORBIDDEN_MSG);
                else return pgResponses.setError(pgResponses.API_ERROR, pgResponses.API_ERROR_MSG);            
            });
    },

    getUserById: function(url, email, token) {
        return makeFetch(url, arrayMethods.GET, null, email, token)
            .then(body => body.emailAddress)
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, pgResponses.NOT_FOUND_PROJECT_MSG);
                else if(error.status == pgResponses.FORBIDDEN) return pgResponses.setError(error.status, pgResponses.FORBIDDEN_MSG);
                else return pgResponses.setError(pgResponses.API_ERROR, pgResponses.API_ERROR_MSG);            
            });
    },

    getIssues: function(url, email, token, key) {
        return makeFetch(`${url}/rest/api/2/search?jql=project=${key}`, arrayMethods.GET, null, email, token)
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
            .catch(error => {
                if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, pgResponses.NOT_FOUND_PROJECT_MSG);
                else if(error.status == pgResponses.FORBIDDEN) return pgResponses.setError(error.status, pgResponses.FORBIDDEN_MSG);
                else return pgResponses.setError(pgResponses.API_ERROR, pgResponses.API_ERROR_MSG);            
            });
    }
}   
