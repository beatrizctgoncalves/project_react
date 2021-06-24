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

    router.get(`/notifications/:username`, getUserNotifications); //Get all user's notifications
    router.post(`/notifications/:username/groups/:group_id`, addMemberToGroup); //Add a specific user to a group
    router.delete(`/notifications/:username/groups/:group_id`, removeUserNotification);

    router.get('/:username', getUser);
    router.patch('/:username', updateUser);
    router.patch('/:username/avatar', updateUserAvatar);
    router.delete('/:username', deleteUser);

    return router;


    function signUp(req, res) {
        aux.promisesAsyncImplementation(
            services.createUser(req),
            res
        );
    }

    function signIn(req, res) {
        if (req.isAuthenticated()) {
            res.json({ message: "Successfull SignIn" })

        } else {
            res.json({ message: "Something went wrong with SignIn" })
        }
    }

    function logOut(req, res) {
        if (!req.isAuthenticated()) {
            res.send("Successfull logout")
        } else {
            res.send("Something wrong with logout")
        }
    }

    function getUserNotifications(req, res) { //Implementation of the route to get all notifications of a user
        aux.promisesAsyncImplementation(
            services.getUserNotifications(req.params.username),
            res
        );
    }

    function addMemberToGroup(req, res) { //Implementation of the route to add a user to a specific group
        aux.promisesAsyncImplementation(
            services.addMemberToGroup(req.params.group_id, req.params.username),
            res
        );
    }

    function removeUserNotification(req, res) { //Implementation of the route to delete a specific notification of a user
        aux.promisesAsyncImplementation(
            services.removeUserNotification(req.params.username, req.params.group_id),
            res
        );
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

    function updateUserAvatar(req, res) {
        aux.promisesAsyncImplementation(
            services.updateUserAvatar(req.params.username, req.body.updatedAvatar),
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
