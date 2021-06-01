'use strict'


function requests(fetch, pgResponses) {
    const rq = {
        arrayMethods : {
            POST: 'POST',
            GET: 'GET',
            DELETE: 'DELETE'
        },

        ES_URL :'http://localhost:9200/',
        GIT_URL : 'https://gitlab.com/api/v4/',

        makeFetchElastic: function(uri, method, body) {
            return fetch(`${ES_URL}`.concat(uri), {
                method: method,
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: body //Request body
            })
                .then(response => response.json()).catch(err => console.log(err)) //Expecting json response
        },

        makeFetchJira: function(uri, method, body, email, token) {
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
        },

        makeRequestGitLab: function(URI) {
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
    return rq;
}

module.exports = requests;