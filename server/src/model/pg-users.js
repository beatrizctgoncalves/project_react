'use strict'

module.exports = function(express, services, aux, authization) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();
    const authenticate = authization.authenticate
    const auth = authization.authorization


    router.post('/signup', signUp);
    router.post('/signin', authenticate.usingLocal, signIn);
    router.post('/logout',authenticate.logout, logOut);

    router.get('/test',auth.getUserPermissions,test)
    

    router.get('/:username', getUser);
    router.patch('/:username', updateUser);
    router.delete('/:username', deleteUser);

    return router;

    
    function signUp(req, res) {
        console.log("signUp in pg-users");
        const name = req.body.name? req.body.name : "";
        const surname = req.body.surname? req.body.surname :  "";

        aux.promisesAsyncImplementation(
            services.createUser(req.body.username, req.body.password,name,surname, 'users/'),
            res
        );
    }

    function test (req,res){
        res.send()

    }

    function signIn(req, res) {
        if(req.isAuthenticated()){
            console.log(req.isAuthenticated())
            res.send("Successfull login")
        }
        else{

            res.send("Something wrong with login")
        }
        
    }

    function logOut(req, res) {
        if(!req.isAuthenticated()){
            res.send("Successfull logOut")
        }
        else{

            res.send("Something wrong with logout")
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
