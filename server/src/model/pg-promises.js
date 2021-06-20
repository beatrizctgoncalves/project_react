'use strict'

module.exports = {
    promisesAsyncImplementation: function (promise, res) {
        promise
            .then(result => {
                //Success reponse
                res.statusCode = result.status
                res.json({ message: result.body })
            })
            .catch(err => {
                //Error response
                res.statusCode = err.status
                res.json({ error: err })
            });
    }
}