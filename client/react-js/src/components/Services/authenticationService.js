const { request, makeRequest, getRequest, DEFAULT_OPTIONS } = require('./Requests').requests;


export function loginFetch(usernameInput, passwordInput) {
    const uri = `http://localhost:8080/users/g5/pluggable/gamification/signin`
    const options = {
        username: usernameInput,
        password: passwordInput
    }

    return makeRequest(uri, options, 'POST')
}