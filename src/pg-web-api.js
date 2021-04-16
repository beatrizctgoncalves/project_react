'use strict'

module.exports = function(express, services) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();

    router.post('groups', createGroup); //create group
    router.get('/groups', getUserGroups); //get user's groups
    router.get('/groups/:id', getGroupDetails); //get details of a specific group
    router.get('/groups/:id/rankings', getGroupRankings); //get group's rankings
    router.get('/rankings', getRankings); //get all rankings

    return router;

    function createGroup(req, res) {
        promisesAsyncImplementation(
            services.createGroup(req.body.owner, req.body.group_name, req.body.group_description, req.body.type, req.body.project_id),
            res
        );
    }

    function getUserGroups(req, res) {
        promisesAsyncImplementation(
            services.getUserGroups(req.params.owner),
            res
        );
    }

    function getGroupDetails(req, res) {
        promisesAsyncImplementation(services.getGroupsDetails(req.params.group_id),
            res
        );
    }

    function getGroupRankings(req, res) {
        promisesAsyncImplementation(services.getGroupRankings(req.params.group_id),
            res
        );
    }

    function getRankings(req, res) {
        promisesAsyncImplementation(services.getRankings(),
            res
        );
    }
}

//Handle multiple asynchronous operations easily and provide better error handling than callbacks and events
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