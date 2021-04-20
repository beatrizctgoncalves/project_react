'use strict'

module.exports = function(express, services) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();

    router.post('/projects', createProject); //create project
    router.get('/projects/owner/:owner', getUserProjects); //get user's projects
    router.get('/projects/:project_id', getProjectDetails); //get details of a specific project
    router.delete('/projects/:project_id', deleteProject); //delete a project
    router.put('/projects/:project_id', editProject); //update project

    router.post(`/projects/:project_id/member/:username`, addMemberToProject); //Add a specific user to a project
    router.delete('/projects/:project_id/member/:username', removeMemberFromProject); //Remove a specific user from a project

    router.get('/projects/:project_id/rankings', getProjectRankings); //get project's rankings
    router.get('/rankings', getRankings); //get all rankings
    

    return router;

    function createProject(req, res) {
        promisesAsyncImplementation(
            services.createProject(req.body.owner, req.body.name, req.body.description, req.body.type, req.body.project_id, 'api/projects/'),
            res
        );
    }

    function getUserProjects(req, res) {
        promisesAsyncImplementation(
            services.getUserProjects(req.params.owner),
            res
        );
    }

    function getProjectDetails(req, res) {
        promisesAsyncImplementation(
            services.getProjectDetails(req.params.project_id),
            res
        );
    }

    function deleteProject(req, res) {
        promisesAsyncImplementation(
            services.deleteProject(req.params.project_id, 'api/projects/'),
            res
        );
    }

    function editProject(req, res) {
        promisesAsyncImplementation(
            services.editProject(req.params.project_id, req.body.name, req.body.description, 'api/projects/'),
            res
        );
    }

    function addMemberToProject(req, res) { //Implementation of the route to add a user to a specific project
        promisesAsyncImplementation(
            services.addMemberToProject(req.params.project_id, req.params.username, 'api/projects/'),
            res
        );
    }

    function removeMemberFromProject(req, res) { //Implementation of the route to delete a specific user from a project
        promisesAsyncImplementation(
            services.removeMemberFromProject(req.params.project_id, req.params.username, 'api/projects/'),
            res
        );
    }

    function getProjectRankings(req, res) {
        promisesAsyncImplementation(
            services.getProjectRankings(req.params.project_id),
            res
        );
    }

    function getRankings(req, res) {
        promisesAsyncImplementation(
            services.getRankings(),
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