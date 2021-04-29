'use strict'

const fetch = require('node-fetch');
const pgResponses = require('./pg-responses');

module.exports = {
    validateProject: function(url, email, token, key) {
        return fetch(`${url}/rest/api/3/project/${key}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    `${email}:${token}`
                ).toString('base64')}`,
                'Accept': 'application/json'
            }
        })
        .then(body => {
            if(body.status != pgResponses.OK) return Promise.reject(body);
            return body.status;
        })
        .catch(error => {
            if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, pgResponses.NOT_FOUND_PROJECT_MSG);
            else if(error.status == pgResponses.FORBIDDEN) return pgResponses.setError(error.status, pgResponses.FORBIDDEN_MSG);
            else return pgResponses.setError(pgResponses.API_ERROR, pgResponses.API_ERROR_MSG);            
        });
    },

    getIssue: function(url, email, token) {
        return fetch(`${url}/rest/api/3/search?jql=`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    `${email}:${token}`
                ).toString('base64')}`,
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(body => body.forEach(issue => {
            return {
                "id": issue.id,
                "key": issue.key,
                "issuetype-name": issue.fields.issuetype.name,
                "issuetype-iconUrl": issue.fields.issuetype.iconUrl,
                "summary": issue.fields.summary,
                "priority-name": issue.fields.priority.name,
                "priority-id": issue.fields.priority.id,
                "assignee": issue.fields.assignee,
                "reporter": issue.fields.reporter.accountId,
                "state": issue.field.status.name,
                "created": issue.fields.created,
                "project-id": issue.field.project.id,
                "project-name": issue.fields.project.name
            }
        }))
        .catch(error => pgResponses.setError(error.status, error.statusText));
    }
}   
