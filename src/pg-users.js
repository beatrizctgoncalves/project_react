'use strict'

module.exports = function(express, services) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();

    router.post('/signup', signUp);
    router.get('/:username', getUser);
    router.post('/signin', signIn);

    return router;

    function signUp(req, res) {
        promisesAsyncImplementation(
            services.createUser(req.body.username, req.body.password, 'users/'),
            res
        );
    }

    function getUser(req, res) {
        promisesAsyncImplementation(
            services.getUser(req.params.username),
            res
        );
    }

    function signIn(req, res) {
        
    }
}

function promisesAsyncImplementation(promise, res) {
    promise
    .then(result => {
        //Success reponse
        res.statusCode = result.status
        res.json(result.body)
    })
    .catch(err => {
        //Error response
        res.statusCode = err.status
        res.json({error: err})
    });
}
