'use strict'

function services(database, pgResponses, apiGitlab, apiJira) {
    const serv = {

        createGroup: function(owner, group_name, group_description, type, project_id) {
            if (type.gitlab) {
                //TODO: apiGitlab.getUserProjects();
            }
            return database.createGroup(owner, group_name, group_description, type, project_id)
                .then(groups => {
                    return pgResponses(
                        pgResponses.CREATE,
                        groups
                    )
                })
        },

        getUserGroups: function(owner) {
            return database.getUserGroups()
                .then(groups => {
                    return pgResponses(
                        pgResponses.OK,
                        groups
                    )
                })
        },

        getGroupsDetails: function(group_id) {

        },

        getGroupRankings: function(group_id) {

        },

        getRankings: function() {

        }
    }
    return serv;
}

module.exports = services;