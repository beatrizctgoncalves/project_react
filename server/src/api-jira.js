// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch

const fetch = require('node-fetch');

module.exports = {
    getIssues: function() {
        return fetch('https://pluggable-gamification.atlassian.net/rest/api/3/search?jql=', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${Buffer.from(
                    'beatrizctgoncalves@gmail.com:fRmZuCiKn5gL3T5v9DAZC1E9'
                ).toString('base64')}`,
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(body => console.log(text))
        .catch(err => console.error(err));
    }
}

