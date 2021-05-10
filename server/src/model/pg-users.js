'use strict'

module.exports = function(express, services, aux) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();

    router.post('/signup', signUp);
    //router.post('/signin',authization.authenticate.usinglocal, signIn);

    router.get('/:username', getUser);
    router.patch('/:username', updateUser);
    router.delete('/:username', deleteUser);

    return router;

    function signUp(req, res) {
        aux.promisesAsyncImplementation(
            services.createUser(req.body.username, req.body.password, 'users/'),
            res
        );
    }

    function signIn(req, res) {
        if(req.isAuthenticated()){
            res.send("Successfull login")
        }
        else{
            res.send("Something wrong with login")
        }
        
    }

    function getUser(req, res) {
        aux.promisesAsyncImplementation(
            services.getUser(req.params.username),
            res
        );
    }

    function updateUser(req, res) {
        aux.promisesAsyncImplementation(
            services.updateUser(req.params.username, req.params.firstName, req.params.lastName, req.params.email, req.params.password, 'users/'),
            res
        );
    }

    function deleteUser(req, res) {
        aux.promisesAsyncImplementation(
            services.deleteUser(req.params.username, 'users/'),
            res
        );
    }
}
