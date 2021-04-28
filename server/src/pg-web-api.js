'use strict'

module.exports = function(express, services) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();

    router.post('/groups', createGroup); //create group
    router.get('/groups/owner/:owner', getUserGroups); //get user's groups
    router.get('/groups/:group_id', getGroupDetails); //get details of a specific group
    router.delete('/groups/:group_id', deleteGroup); //delete a group
    router.patch('/groups/:group_id', editGroup); //update group

    router.get(`/groups/:group_id/members`, getGroupMembers); //Add a specific user to a group
    router.post(`/groups/:group_id/member/:username`, addMemberToGroup); //Add a specific user to a group
    router.delete('/groups/:group_id/member/:username', removeMemberFromGroup); //Remove a specific user from a group

    router.get('/groups/:group_id/rankings', getGroupRankings); //get group's rankings
    router.get('/rankings', getRankings); //get all rankings

    router.get('/groups/:group_id/jira/issues', getJiraIssuesFromGroup);
    
    return router;

    function createGroup(req, res) {
        promisesAsyncImplementation(
            services.createGroup(req.body.owner, req.body.name, req.body.description, req.body.type, req.body.group_id, 'api/groups/'),
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
        promisesAsyncImplementation(
            services.getGroupDetails(req.params.group_id),
            res
        );
    }

    function deleteGroup(req, res) {
        promisesAsyncImplementation(
            services.deleteGroup(req.params.group_id, 'api/groups/'),
            res
        );
    }

    function editGroup(req, res) {
        promisesAsyncImplementation(
            services.editGroup(req.params.group_id, req.body.name, req.body.description, 'api/groups/'),
            res
        );
    }

    function getGroupMembers(req, res) {
        promisesAsyncImplementation(
            services.getGroupMembers(req.params.group_id),
            res
        );
    }

    function addMemberToGroup(req, res) { //Implementation of the route to add a user to a specific group
        promisesAsyncImplementation(
            services.addMemberToGroup(req.params.group_id, req.params.username, 'api/groups/'),
            res
        );
    }

    function removeMemberFromGroup(req, res) { //Implementation of the route to delete a specific user from a group
        promisesAsyncImplementation(
            services.removeMemberFromGroup(req.params.group_id, req.params.username, 'api/groups/'),
            res
        );
    }

    function getGroupRankings(req, res) {
        promisesAsyncImplementation(
            services.getGroupRankings(req.params.group_id),
            res
        );
    }

    function getRankings(req, res) {
        promisesAsyncImplementation(
            services.getRankings(),
            res
        );
    }

    function getJiraIssuesFromGroup(req, res) {
        promisesAsyncImplementation(
            services.getJiraIssuesFromGroup(req.group_id),
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