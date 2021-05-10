'use strict'


module.exports = (fetch, pgResponses) => {
    var arrayMethods = {
        POST: 'POST',
        GET: 'GET',
        DELETE: 'DELETE'
    }

    const ES_URL = 'http://localhost:9200/'
    const GIT_URL = 'https://gitlab.com/api/v4/'

    function makeFetchElastic(uri, method, body) {
        return fetch(`${ES_URL}`.concat(uri), {
            method: method,
            headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                'Content-Type': 'application/json'
            },
            body: body //Request body
        })
            .then(response => response.json()) //Expecting json response
    }

    function makeFetchJira(uri, method, body, email, token) {
        return fetch(uri, {
            method: method,
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    `${email}:${token}`
                ).toString('base64')}`,
                'Accept': 'application/json'
            },
            body: body //Request body
        })
            .then(response => {
                if(response.status != pgResponses.OK) return Promise.reject(response);
                return response.json()
            })
    }

    function makeRequestGitLab(URI) {
        return fetch(GIT_URL.concat(URI), {
            method: arrayMethods.GET,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if(response.status != pgResponses.OK) return Promise.reject(response);
            return response.json()
        })
    }
}