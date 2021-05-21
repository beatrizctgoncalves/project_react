'use strict'

module.exports = function(express, services, aux) {
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
    router.post(`/groups/:group_id/project/jira`, addProjectJiraToGroup); //Add a specific Jira project to a group
    router.post(`/groups/:group_id/project/gitlab`, addProjectGitlabToGroup); //Add a specific Gitlab project to a group
    router.delete('/groups/:group_id/project/:project_id', removeProjectFromGroup); //Remove a specific project from a group

    router.get(`/groups/:group_id/members`, getGroupMembers); //Add a specific user to a group
    router.post(`/groups/:group_id/member/:username`, addMemberToGroup); //Add a specific user to a group
    router.delete('/groups/:group_id/member/:username', removeMemberFromGroup); //Remove a specific user from a group

    router.get('/groups/:group_id/rankings', getGroupRankings); //get group's rankings
    router.get('/rankings', getRankings); //get all rankings
    
    return router;

    function createGroup(req, res) {      
        aux.promisesAsyncImplementation(
            services.createGroup(req.user.username, req.body.name, req.body.description, req.body.type, req.body.group_id),
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

    function addProjectJiraToGroup(req, res) {
        aux.promisesAsyncImplementation(
            services.addProjectJiraToGroup(req.params.group_id, req.body.url, req.body.email, req.body.token, req.body.key),
            res
        );
    }

    function removeProjectFromGroup(req, res) {
        aux.promisesAsyncImplementation(
            services.removeProjectFromGroup(req.params.group_id, req.params.project_id),
            res
        );
    }

    function addProjectGitlabToGroup(req, res) {
        aux.promisesAsyncImplementation(
            services.addProjectGitlabToGroup(req.params.group_id, req.body.pid, req.body.atoken),
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

    function removeMemberFromGroup(req, res) { //Implementation of the route to delete a specific user from a group
        aux.promisesAsyncImplementation(
            services.removeMemberFromGroup(req.params.group_id, req.params.username),
            res
        );
    }

    function getGroupRankings(req, res) {
        aux.promisesAsyncImplementation(
            services.getGroupRankings(req.params.group_id, req.body.url, req.body.email, req.body.token),
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