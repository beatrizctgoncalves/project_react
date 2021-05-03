const AccessToken = 'QFMzNwpVPQgoCmEUpwUj'
const UserName = 'pinto6'
const URL = 'https://gitlab.com/api/v4/'

const fetch = require('node-fetch');
const pgResponses = require('./pg-responses');

/*Test to get issues*/
//getUserId(UserName)
//    .then(Uid => getProjects(Uid, AccessToken))
//    .then(Pid => getIssues(Pid, AccessToken))

teste("pinto6")

function makeRequest(URI) {
    return fetch(`${URL}${URI}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        console.log(response)
        if(response.status != pgResponses.OK) return Promise.reject(response);
        return response.json()
    })
}


function resolveError(error){
    if(error.status == pgResponses.NOT_FOUND) return pgResponses.setError(error.status, pgResponses.NOT_FOUND_PROJECT_MSG);
    else if(error.status == pgResponses.FORBIDDEN) return pgResponses.setError(error.status, pgResponses.FORBIDDEN_MSG);
    else return pgResponses.setError(pgResponses.API_ERROR, pgResponses.API_ERROR_MSG);            
}

module.exports = {

    validateProject: function(Pid, AToken) {
        return makeRequest(`projects/${Pid}?access_token=${AToken}`)
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
            .catch(error => resolveError(error))
    },

    getUserId: function(username) {
        return makeRequest(`users?username=${username}`)
            .then(user => user[0].id)
            .catch(error => resolveError(error))
    },
    
    getProjectsFromUser: function(Uid, AToken) {
        return makeRequest(`users/${Uid}/projects?access_token=${AToken}`)
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
        .catch(error => resolveError(error))
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
                    "due_date": issue.due_date 
                }
            }))
            .catch(error => resolveError(error));
    }
}
