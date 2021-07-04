'use strict'


function requests(fetch, pgResponses) {
    const rq = {
        arrayMethods: {
            POST: 'POST',
            GET: 'GET',
            DELETE: 'DELETE'
        },

        ES_URL: 'http://localhost:9200/',

        index: {
            groups: 'groups/',
            users: 'users/'
        },

        makeFetchElastic: function (uri, method, body) {
            return fetch(this.ES_URL.concat(uri), {
                method: method,
                headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                    'Content-Type': 'application/json'
                },
                body: body //Request body
            })
                .then(response => response.json())
        }
    }
    return rq;
}

module.exports = requests;