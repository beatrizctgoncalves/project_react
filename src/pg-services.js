'use strict'

function services(database, pgResponses, apiGitlab, apiJira) {
    const serv = {

        createGroup: function(owner, group_name, group_description, type, project_id, index) {
            if (type.gitlab) {
                //TODO: apiGitlab.getUserProjects();
            }
            return database.createGroup(owner, group_name, group_description, type, project_id)
                .then(groups => {
                    return pgResponses.setSuccessUri(
                        pgResponses.CREATE,
                        index,
                        groups
                    )
                })
        },

        getUserGroups: function(owner) {
            return database.getUserGroups(owner)
                .then(groups => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        groups
                    )
                })
        },

        getGroupDetails: function(group_id) {
            return database.getGroupDetails(group_id)
                .then(group => {
                    return pgResponses.setSuccessList(
                        pgResponses.OK,
                        group
                    )
                })
        },

        getGroupRankings: function(group_id) {
            /*return database.getGroupDetails(group_id)
                .then(group => {
                    const gamesArray = [];
                    const newObj = groupObj.games.map(g => {
                    return data.getSpecificGame(g.id)
                            .then(gameResult => {
                                if(gameResult.total_rating > min && gameResult.total_rating < max) {
                                    return data.getImage(g.id)
                                        .then(urlImage => {
                                            gameResult.urlImage = urlImage; //get image
                                            gamesArray.push(gameResult);
                                            return;
                                        })
                                } else {
                                    return;
                                }
                            })
                    });
                    return Promise.all(newObj)
                        .then(() => {
                            if(gamesArray.length) {
                                gamesArray.sort((a, b) => b.rating - a.rating); //sort the array games so that games can appear decreasingly
                                return covidaResponses.setSuccessToList(
                                    covidaResponses.OK,
                                    gamesArray
                                )
                            } else {
                                return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GAMES_0_MSG);
                            }  
                        }) 
                })*/
        },

        getRankings: function() {
            //TODO
        },

        createUser: function() {
            //TODO
        }
    }
    return serv;
}

module.exports = services;