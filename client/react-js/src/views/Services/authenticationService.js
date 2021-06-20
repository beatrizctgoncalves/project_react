const { request, makeRequest, getRequest, DEFAULT_OPTIONS } = require('./Requests').requests;


export async function loginFetch(usernameInput, passwordInput) {
    const uri = `http://localhost:8081/server/users/g5/pluggable/gamification/signin`
    const options = {
        username: usernameInput,
        password: passwordInput
    }


    return makeRequest(uri, options, 'POST')
}

export async function signUpFetch(options) {
    const uri = `http://localhost:8081/server/users/g5/pluggable/gamification/signup`

    return makeRequest(uri, options, 'POST')
        .then(resp => {
            console.log(resp)
            return resp
        }).catch(err => {
            console.log(err)
        })
}

/*      

                            {toAddMembers? 
                            <>
                            <label><h3>Insert New Members</h3></label>
                             <input
                                type="text" 
                                name = "newMember"
                                className="form-control" 
                                placeholder="Enter new Member" 
                                value={newMember}
                                onChange= {handleMember}
                            /> 
               
                <Button  className="button1" onClick = {handleAddMembers}> Add Member </Button>

            </>:""}
                        
                        
                        <Button onClick = {handleToEditChange}>{toAddMembers?"-":"Add Members"} </Button>
                        
                        
                        
                        
                        
                         function handleAddMembers(){
            addMemberToGroup(newMember)
            .then(resp =>{
                setAddMembers(false)
            })

        }*/ 