'use strict'

module.exports = function(express, services) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();

    router.post('/signup', signUp);
    router.post('/signin', signIn);

    router.get('/:username', getUser);
    router.patch('/:username', updateUser);
    router.delete('/:username', deleteUser);

    return router;

    function signUp(req, res) {
        promisesAsyncImplementation(
            services.createUser(req.body.username, req.body.password, 'users/'),
            res
        );
    }

    function signIn(req, res) {
        
    }

    function getUser(req, res) {
        promisesAsyncImplementation(
            services.getUser(req.params.username),
            res
        );
    }

    function updateUser(req, res) {
        promisesAsyncImplementation(
            services.updateUser(req.params.username, req.params.firstName, req.params.lastName, req.params.email, req.params.password, 'users/'),
            res
        );
    }

    function deleteUser(req, res) {
        promisesAsyncImplementation(
            services.deleteUser(req.params.username, 'users/'),
            res
        );
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
