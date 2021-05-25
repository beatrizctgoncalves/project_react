'use strict'


function apiJira(requests, pgResponses) {
    const jira = {
        validateProject: function(url, email, token, key) {
            return requests.makeRequestJira(`${url}/rest/api/3/project/${key}?expand=lead`, requests.arrayMethods.GET, null, email, token)
                .then(body => {
                    return {
                        "id": body.id,
                        "key": key,
                        "lead_self": body.lead.self,
                        "lead_id": body.lead.accountId,
                        "description": body.description,
                        "avatar": body.avatarUrls,
                        "projectTypeKey": body.projectTypeKey,
                        "type": "jira"
                    
                    
                        /* NEEDS TO BE LIKE THIS WITH THIS KEYS
                        "id": body.id,
                        "owner_name": body.owner.username,
                        "owner_id": body.owner.id,
                        "description": body.description,
                        "avatar": body.avatar_url,
                        "type": "Gitlab"*/
                    }
                })
                .catch(error => pgResponses.resolveErrorApis(error));
        },

        getUserById: function(url, email, token) {
            return requests.makeRequestJira(`${url}&expand=groups,applicationRoles`, requests.arrayMethods.GET, null, email, token)
                .then(body => body)
                .catch(error => pgResponses.resolveErrorApis(error));
        },

        getIssues: function(url, email, token, key) {
            return requests.makeRequestJira(`${url}/rest/api/2/search?jql=project=${key}`, requests.arrayMethods.GET, null, email, token)
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
