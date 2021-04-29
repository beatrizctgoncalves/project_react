const AccessToken = 'QFMzNwpVPQgoCmEUpwUj'
const UserName = 'pinto6'
const URL = 'https://gitlab.com/api/v4/'

const fetch = require('node-fetch');

/*Test to get issues*/
getUserId(UserName)
    .then(Uid => getProjects(Uid,AccessToken))
    .then(Pid => getIssues(Pid,AccessToken))


function makeRequest(URI){
    return fetch(`${URL}${URI}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(err => console.error(err));
}


function getUserId(username) {
    return makeRequest(`users?username=${username}`)
        .then(user => user[0].id)
        .catch(err => console.error(err));
}


function getProjects(Uid,AToken) {
    return makeRequest(`users/${Uid}/projects?access_token=${AToken}`)
        .then(projects => projects[0].id)  //getting the first project available, should be searched by name or something similar
        .catch(err => console.error(err));
}

function getIssues(PId,AToken) {
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
        //.then(issues => console.log(issues))
        .catch(err => console.error(err));
}