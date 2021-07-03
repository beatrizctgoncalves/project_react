const { makeRequest } = require('./Requests').requests;
const urls = {
    groups: 'http://localhost:8081/server/api/g5/pluggable/gamification/',
    users: 'http://localhost:8081/server/users/g5/pluggable/gamification/'
}

export async function getUser(username) {
    const uri = `${username}`

    return makeRequest(urls.users.concat(uri))
        .then(resp => {
            return resp
        })
}

export async function deleteUser(username) {
    const uri = `${username}`

    return makeRequest(urls.users.concat(uri), {}, 'DELETE')
        .then(resp => {
            return resp
        })
}

export async function updateUser(username, updatedUser) {
    const uri = `${username}`

    return makeRequest(urls.users.concat(uri), { updatedInfo: updatedUser }, "PATCH")
        .then(resp => {
            return resp
        })
}

export async function getUserNotifications(username) {
    const uri = `${username}`

    return makeRequest(urls.users.concat(uri))
        .then(resp => {
            return resp
        })
}

export async function removeUserNotification(username, group_id) {
    const uri = `/notifications/${username}/groups/${group_id}`

    return makeRequest(urls.users.concat(uri), {}, "DELETE")
        .then(resp => {
            return resp
        })
}

export async function getUserGroups(owner) {
    const uri = `groups/owner/${owner}`

    return makeRequest(urls.groups.concat(uri))
        .then(resp => {
            return resp
        })
}

export async function getUserMemberGroups(member) {
    const uri = `groups/member/${member}`

    return makeRequest(urls.groups.concat(uri))
        .then(resp => {
            return resp
        })
}

export async function getSpecificGroup(id) {
    const uri = `groups/${id}`

    return makeRequest(urls.groups.concat(uri))
        .then(resp => {
            return resp
        })
}

export async function addMemberToGroup(groupId, newMember) {
    const uri = `groups/${groupId}/members`

    return makeRequest(urls.groups.concat(uri), { username: newMember }, "POST")
        .then(resp => {

            return resp
        })
}

export async function removeMemberFromGroup(groupId, username) {
    const uri = `groups/${groupId}/members/${username}`

    return makeRequest(urls.groups.concat(uri), {}, 'DELETE')
        .then(resp => {
            return resp
        })
}

export async function deleteGroup(groupId) {
    const uri = `groups/${groupId}`

    return makeRequest(urls.groups.concat(uri), {}, "DELETE")
        .then(resp => {
            return resp
        })
}

export async function editGroup(groupId, updatedGroup) {
    const uri = `groups/${groupId}`

    return makeRequest(urls.groups.concat(uri), updatedGroup, "PATCH")
        .then(resp => {
            return resp
        })
}

export async function createGroup(newGroup) {
    const uri = `groups`

    return makeRequest(urls.groups.concat(uri), newGroup, "POST")
        .then(resp => {
            return resp
        })
}

export async function getToolProjects(tool, URL, ownerCredentials) {
    const uri = `tools/${tool}/projects`
    const body = {
        URL,
        ownerCredentials
    }

    return makeRequest(urls.groups.concat(uri), body, 'POST')
        .then(resp => {
            return resp
        })
}

export async function addSprintToGroup(groupId, body) {
    const uri = `groups/${groupId}/sprints`

    return makeRequest(urls.groups.concat(uri), body, "POST")
        .then(resp => {
            return resp
        })
}

export async function addProjectToGroup(groupId, projectId, tool, url, ownerCredentials) {
    const uri = `groups/${groupId}/projects`

    const body = {
        Pid: projectId,
        type: tool,
        URL: url,
        ownerCredentials: ownerCredentials
    }

    return makeRequest(urls.groups.concat(uri), body, "POST")
        .then(resp => {
            return resp
        })
}

export async function removeProjectFromGroup(groupId, projectId) {
    const uri = `groups/${groupId}/projects/${projectId}`

    return makeRequest(urls.groups.concat(uri), {}, "DELETE")
        .then(resp => {
            return resp
        })
}

export async function addMemberInfo(groupId, projectId, tool, url, ownerCredentials) {
    const uri = `groups/${groupId}/projects`

    const body = {
        Pid: projectId,
        type: tool,
        URL: url,
        ownerCredentials: ownerCredentials
    }

    return makeRequest(urls.groups.concat(uri), body, "POST")
        .then(resp => {
            return resp
        })
}

export async function getRankings(groupId) {
    const uri = `groups/${groupId}/rankings`

    return makeRequest(urls.groups.concat(uri))
        .then(resp => {
            return resp
        })
}