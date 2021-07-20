const { makeRequest } = require('./Requests').requests;
const users = 'http://localhost:8081/server/users/g5/pluggable/gamification/'

export async function loginFetch(usernameInput, passwordInput) {
    const uri = `signin`
    const options = {
        username: usernameInput,
        password: passwordInput
    }

    return makeRequest(users.concat(uri), options, 'POST')
}

export async function signUpFetch(options) {
    const uri = `signup`

    return makeRequest(users.concat(uri), options, 'POST')
        .then(resp => resp.message)
}

export async function logout() {
    const uri = `logout`

    return makeRequest(users.concat(uri), {}, 'POST')
        .then(resp => resp)
}

export async function loginGoogle() {
    const uri = `google/signIn`

    return fetch(users.concat(uri), { method: "GET" })
        .then(resp => {
            console.log("here")
            console.log(resp.url)

            return resp
        })
}
