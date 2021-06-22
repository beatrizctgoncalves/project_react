'use strict'


module.exports = function (express, services, aux, authization) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();
    const authenticate = authization.authenticate
    const auth = authization.authorization

    router.post('/signup', signUp);
    router.post('/signin', async (req, res, next) => {
        await authenticate.usingLocal(req, res, err => {
            if (err) {
                const myError = {
                    status: err.status,
                    body: err.message
                }
                res.statusCode = err.status
                res.json({ error: myError })
            }
            next()
        })
    }, signIn);
    router.post('/logout', authenticate.logout, logOut);

    router.get('/test', auth.getUserPermissions, test);

    router.get('/:username', getUser);
    router.patch('/:username', updateUser);
    router.delete('/:username', deleteUser);

    return router;


    function signUp(req, res) {
        const name = req.body.name ? req.body.name : "";
        const surname = req.body.surname ? req.body.surname : "";
        const email = req.body.email ? req.body.email : "";

        aux.promisesAsyncImplementation(
            services.createUser(req.body.username, req.body.password, name, surname, email),
            res
        );
    }

    function signIn(req, res) {
        if (req.isAuthenticated()) {
            res.json({message : "Successfull SignIn"})

        } else {
            res.json({message : "Something wrong with SignIn"})
           // res.send("Something wrong with SignIn")
        }
    }

    function logOut(req, res) {
        if (!req.isAuthenticated()) {
            res.send("Successfull logOut")
        } else {
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
            services.updateUser(req.params.username, req.body.updatedInfo),
            res
        );
    }

    function deleteUser(req, res) {
        aux.promisesAsyncImplementation(
            services.deleteUser(req.params.username),
            res
        );
    }
}
