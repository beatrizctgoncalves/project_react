const AccessToken = 'QFMzNwpVPQgoCmEUpwUj'
const UserName = 'pinto6'
const URL = 'https://gitlab.com/api/v4/'

const fetch = require('node-fetch');

getUserId(UserName,AccessToken)
    .then(Uid => getProjects(Uid,AccessToken))
    .then(Pid => getIssues(Pid,AccessToken))



function getUserId(username,AToken) {
    return fetch(`${URL}users?username=${username}&access_token=${AToken}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(user => user[0].id)
    .catch(err => console.error(err));
}


function getProjects(Uid,AToken) {
    return fetch(`${URL}users/${Uid}/projects?access_token=${AToken}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(projects => projects[0].id)
    .catch(err => console.error(err));
}

function getIssues(PId,AToken) {
    return fetch(`${URL}projects/${PId}/issues?access_token=${AToken}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
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
    .then(issues => console.log(issues))
    .catch(err => console.error(err));
}