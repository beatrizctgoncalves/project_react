'use strict'

module.exports = function(express, services, pgScores, aux) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();

    router.post('/groups', createGroup); //create group
    router.get('/groups/owner/:owner', getUserGroups); //get user's groups
    router.get('/groups/:group_id', getGroupDetails); //get details of a specific group
    
    router.delete('/groups/:group_id', deleteGroup); //delete a group
    router.put('/groups/:group_id', editGroup); //update group

    router.get(`/groups/:group_id/projects`, getGroupProjects); //Add a specific project to a group
    router.post(`/groups/:group_id/projects`, addProjectToGroup); //Add a specific project to a group
    router.delete('/groups/:group_id/project/:project_id', removeProjectFromGroup); //Remove a specific project from a group

    router.get(`/groups/:group_id/members`, getGroupMembers); //Get a specific user of a group
    router.post(`/groups/:group_id/members/:username`, addMemberToGroup); //Add a specific user to a group
    router.post(`/groups/:group_id/sprints`, addSprintToGroup); //Add a sprint to a group
    router.delete('/groups/:group_id/members/:username', removeMemberFromGroup); //Remove a specific user from a group

    router.get('/groups/:group_id/rankings', getGroupRankings); //get group's rankings
    router.get('/rankings', getRankings); //get all rankings
    
    return router;

    function createGroup(req, res) {
        aux.promisesAsyncImplementation(
            services.createGroup(req.body.owner, req.body.name, req.body.description),
            res
        );
    }

    function getUserGroups(req, res) {
        aux.promisesAsyncImplementation(
            services.getUserGroups(req.params.owner),
            res
        );
    }

    function getGroupDetails(req, res) {
        aux.promisesAsyncImplementation(
            services.getGroupDetails(req.params.group_id),
            res
        );
    }

    function deleteGroup(req, res) {
        aux.promisesAsyncImplementation(
            services.deleteGroup(req.params.group_id),
            res
        );
    }

    function editGroup(req, res) {
        aux.promisesAsyncImplementation(
            services.editGroup(req.params.group_id, req.body.name, req.body.description),
            res
        );
    }

    function getGroupProjects(req, res) {
        aux.promisesAsyncImplementation(
            services.getGroupProjects(req.params.group_id),
            res
        );
    }

    // function addProjectJiraToGroup(req, res) {
    //     aux.promisesAsyncImplementation(
    //         services.addProjectJiraToGroup(req.params.group_id, req.body.url, req.body.email, req.body.token, req.body.key),
    //         res
    //     );
    // }

    function addProjectToGroup(req, res) {
        aux.promisesAsyncImplementation(
            services.addProjectToGroup(req.params.group_id, req.body.Pid, req.body.type),
            res
        );
    }

    function removeProjectFromGroup(req, res) {
        aux.promisesAsyncImplementation(
            services.removeProjectFromGroup(req.params.group_id, req.params.project_id),
            res
        );
    }

    function getGroupMembers(req, res) {
        aux.promisesAsyncImplementation(
            services.getGroupMembers(req.params.group_id),
            res
        );
    }

    function addMemberToGroup(req, res) { //Implementation of the route to add a user to a specific group
        aux.promisesAsyncImplementation(
            services.addMemberToGroup(req.params.group_id, req.params.username),
            res
        );
    }

    function addSprintToGroup(req, res) { //Implementation of the route to add a user to a specific group
        aux.promisesAsyncImplementation(
            services.addSprintToGroup(req.params.group_id, req.body.title, req.body.beginDate, req.body.endDate),
            res
        );
    }

    function removeMemberFromGroup(req, res) { //Implementation of the route to delete a specific user from a group
        aux.promisesAsyncImplementation(
            services.removeMemberFromGroup(req.params.group_id, req.params.username),
            res
        );
    }

    function getGroupRankings(req, res) {
        aux.promisesAsyncImplementation(
            pgScores.countPointsInGroup(req.params.group_id),
            res
        );
    }

    function getRankings(req, res) {
        aux.promisesAsyncImplementation(
            services.getRankings(),
            res
        );
    }
}