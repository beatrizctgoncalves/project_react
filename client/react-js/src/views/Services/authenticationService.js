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
            return resp.message
        }).catch(err => {
            console.log(err)
        })
}
