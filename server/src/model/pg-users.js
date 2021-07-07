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
            next();
        })
    }, signIn);
    router.post('/logout', authenticate.logout, logOut);

    router.get('/:username', getUser);
    router.patch('/:username', updateUser);
    router.delete('/:username', deleteUser);

    return router;


    function signUp(req, res) {
        aux.promisesAsyncImplementation(
            services.createUser(req),
            res
        );
    }

    function signIn(req, res) {
        console.log(req.body)
        const username = req.body.username
        services.getUser(username)
            .catch(err => {
                res.statusCode = err.status
                res.json({ error: err })
            })
        if (req.isAuthenticated()) {
            res.json({ message: "Successfull SignIn" })
        } else {
            res
        }
    }

    function logOut(req, res) {
        if (!req.isAuthenticated()) {
            res.json({ message: "Successfull logout SignIn" })
        } else {
            res.json({ message: "Something wrong with logout" })
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
