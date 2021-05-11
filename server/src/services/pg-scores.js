'use strict'

function services(databaseGroup, databaseUsers, pgResponses) {
    const serv = {       

        countPointsInGroup: function(groupId) { //TODO
            let usersPoints = []
            let usersInfoMap = []
            databaseGroup.getGroupDetails(groupId)
            .then(group => {
                    group.members.forEach(member =>{
                        databaseUsers.getUser(member)
                        .then(user => usersInfoMap.push({member: user.info}))  // needs to review if getUser will return info being a object with all the usernames of the tools like Jira or Gitlab
                    })
                return group.projects
            })
            .then(projects => projects.map(project => { 
                return {
                    "id": project.id,
                    "type": project.type
                }
            }))
            .then(projects => projects.forEach(project => { //TODO
                if(project.type == "Gitlab"){
                    this.countPointsGitlab(project.id)
                }
                if(project.type == "Jira"){
                    this.countPointsJira(project.id)
                }
            }))
        },

        countPointsGitlab: function(projectId) { 
            //TODO
        },
        
        countPointsJira: function(projectId) { 
            //TODO
        }

    }
    return serv;
}

module.exports = services;
