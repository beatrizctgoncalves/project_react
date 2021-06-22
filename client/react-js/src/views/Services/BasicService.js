const { request, makeRequest, getRequest, DEFAULT_OPTIONS } = require('./Requests').requests;

export async function getUserGroups(owner) {
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/owner/${owner}`
    
    return   makeRequest(uri)
                .then(resp =>{
                    console.log(resp)
                    return resp.message
                })
}

export   async function getSpecificGroup(id){
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/${id}`
    
    return   makeRequest(uri)
                .then(resp =>{
                    console.log(resp)
                    return resp.message
                })
}

export   async function addMemberToGroup(groupId,member){
    
    console.log(member)
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/${groupId}/members/${member}`
    
    return   makeRequest(uri,{},"POST")
                .then(resp =>{
                    console.log(resp)
                    return resp.message
                })
}

export   async function deleteGroup(groupId){
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups/${groupId}`
    
    return   makeRequest(uri,{},"DELETE")
                .then(resp =>{
                    console.log(resp)
                    return resp.message
                })
}


export   async function createGroup(newGroup){
    const uri = `http://localhost:8081/server/api/g5/pluggable/gamification/groups`
    
    return   makeRequest(uri,newGroup,"POST")
                .then(resp =>{
                    console.log(resp)
                    return resp.message
                })
}



