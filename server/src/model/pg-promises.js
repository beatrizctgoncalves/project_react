'use strict'

module.exports = {
    promisesAsyncImplementation: function(promise, res) {
        promise
        .then(result => {
            //Success reponse
            res.statusCode = result.status
            res.json(result.body)
        })
        .catch(err => {
            console.log(err)
            //Error response
            res.statusCode = err.status
            res.json({error: err})
        });
    }
}