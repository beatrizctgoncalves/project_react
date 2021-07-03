const { makeRequest } = require('./Requests').requests;


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
            return resp.message
        })
}

export async function logout() {
    const uri = `http://localhost:8081/server/users/g5/pluggable/gamification/logout`

    return makeRequest(uri, {}, 'POST')
        .then(resp => {
            return resp
        })
}