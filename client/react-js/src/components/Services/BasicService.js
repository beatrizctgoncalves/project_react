const { request, makeRequest, getRequest, DEFAULT_OPTIONS } = require('./Requests').requests;

export async function getUserGroups(owner) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/owner/${owner}`

    return makeRequest(uri, 'GET')
        .then(resp => {
            console.log(resp)
            return resp
        })
}