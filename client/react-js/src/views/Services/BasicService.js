const { makeRequest } = require('./Requests').requests;

export async function getUser(username) {
    const uri = `http://localhost:8081/server/users/g5/pluggable/gamification/${username}`

    return makeRequest(uri)
        .then(resp => {
            return resp
        })
}

export async function deleteUser(username) {
    const uri = `http://localhost:8081/server/users/g5/pluggable/gamification/${username}`

    return makeRequest(uri, {}, 'DELETE')
        .then(resp => {
            return resp
        })
}

export async function updateUser(username, updatedUser) {
    const uri = `http://localhost:8081/server/users/g5/pluggable/gamification/${username}`

    return makeRequest(uri, updatedUser, "PATCH")
        .then(resp => {
            return resp
        })
}

export async function getUserNotifications(username) {
    const uri = `http://localhost:8081/server/users/g5/pluggable/gamification/${username}`

    return makeRequest(uri)
        .then(resp => {
            return resp
        })
}

export async function removeUserNotification(username, group_id) {
    const uri = `http://localhost:8081/server/users/g5/pluggable/gamification//notifications/${username}/groups/${group_id}`

    return makeRequest(uri, {}, "DELETE")
        .then(resp => {
            return resp
        })
}

export async function getUserGroups(owner) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/owner/${owner}`

    return makeRequest(uri)
        .then(resp => {
            return resp
        })
}

export async function getSpecificGroup(id) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/${id}`

    return makeRequest(uri)
        .then(resp => {
            return resp
        })
}

export async function addMemberToGroup(groupId, newMember) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/${groupId}/members`

    return makeRequest(uri, { username: newMember }, "POST")
        .then(resp => {
            return resp
        })
}

export async function removeMemberFromGroup(groupId, username) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/${groupId}/members/${username}`

    return makeRequest(uri, {}, 'DELETE')
        .then(resp => {
            return resp
        })
}

export async function deleteGroup(groupId) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/${groupId}`

    return makeRequest(uri, {}, "DELETE")
        .then(resp => {
            return resp
        })
}

export async function editGroup(groupId, updatedGroup) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/${groupId}`

    return makeRequest(uri, updatedGroup, "PATCH")
        .then(resp => {
            return resp
        })
}

export async function createGroup(newGroup) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups`

    return makeRequest(uri, newGroup, "POST")
        .then(resp => {
            return resp
        })
}

export async function getToolProjects(tool,username) {
   
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/tools/${tool}/projects/${username}`
    
    return makeRequest(uri)
        .then(resp => {
            console.log(resp)
            return resp
        })
}

export async function addProjectToGroup(groupId, projectId,type) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/${groupId}/projects`

    const body = {
        Pid: projectId,
        type: type
    }

    return makeRequest(uri, body, "POST")
        .then(resp => {
            return resp
        })
}


export async function getRankings(groupId) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/${groupId}/rankings`

    return makeRequest(uri)
        .then(resp => {
            return resp
        })
}






