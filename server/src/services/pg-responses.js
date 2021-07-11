'use strict'

module.exports = {
    //ERROR
    DB_ERROR: 502,
    API_ERROR: 503,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,

    DB_ERROR_MSG: "Bad Gateway - Error in DataBase",
    API_ERROR_MSG: "Service Unavailable",
    NOT_FOUND_USER_MSG: "User not found",
    NOT_FOUND_PROJECT_MSG: "Project not found",
    NOT_FOUND_USER_PROJECT_MSG: "User not found or Project not found",
    NOT_FOUND_SPRINT_MSG: "Sprint not found",
    NOT_FOUND_GROUP_MSG: "Group not found",
    NOT_FOUND_TASK_MSG: "Group not found",
    NOT_FOUND_USER_TASK_MSG: "Member not found in this group",
    NOT_FOUND_GROUPS_MSG: "You do not have any groups yet",
    BAD_REQUEST_MSG: "Bad Request",
    BAD_REQUEST_AVATAR_MSG: "Bad Request! Your Avatar's link needs to end with .png",
    BAD_REQUEST_USERNAME_MSG: "Invalid username supplied",
    BAD_REQUEST_PASSWORD_MSG: "Invalid password supplied",
    FORBIDDEN_PROJECTS_MSG: "Forbidden! This Project already exists in this Group",
    FORBIDDEN_USER_MSG: "Forbidden! This User already exists in this Group",
    FORBIDDEN_SPRINT_MSG: "Forbidden! This Sprint already exists in this Group",
    FORBIDDEN_TASK_MSG: "Forbidden! This Task already exists in this Group",
    FORBIDDEN_USER_INFO_MSG: "Forbidden! This User already saved his/her information",
    NOT_FOUND_TOOL_MSG: "Tool is not implemented in this server",

    WRONG_PASSWORD_MSG: "Invalid password",
    WRONG_USERNAME_MSG: "Invalid username",

    setError: function (status, message) {
        return Promise.reject({
            status: status,
            body: message
        })
    },

    resolveErrorApis: function (error) {
        if (error.status == this.NOT_FOUND) return this.setError(error.status, this.NOT_FOUND_PROJECT_MSG);
        else if (error.status == this.FORBIDDEN) return this.setError(error.status, this.FORBIDDEN_MSG);
        else return this.setError(this.API_ERROR, this.API_ERROR_MSG);
    },

    resolveErrorElastic: function (error) {
        if (error.status == this.NOT_FOUND) return this.setError(error.status, error.body);
        else return this.setError(this.DB_ERROR, this.DB_ERROR_MSG);
    },

    //Success
    OK: 200,
    CREATE: 201,

    URI_MSG: "http://localhost:8080",
    index: {
        api: '/api/g5/pluggable/gamification',
        groups: '/groups/',
        users: '/users/g5/pluggable/gamification',
        notifications: '/notifications/'
    },

    setSuccessUri: function (status, index, groups, id) {
        return {
            status: status,
            body: {
                id: id,
                link: this.URI_MSG.concat(index).concat(groups).concat(id.toString())
            }
        }
    },

    setSuccessList: function (status, body) {
        return {
            status: status,
            body: body
        }
    }
}