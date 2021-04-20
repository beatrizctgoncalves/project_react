'use strict'

module.exports = {
    //ERROR
    DB_ERROR: 502,
    API_ERROR: 503,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,

    DB_ERROR_MSG: "Bad Gateway: Error in DataBase",
    API_ERROR_MSG: "Service Unavailable",
    NOT_FOUND_USER_MSG: "User not found",
    NOT_FOUND_PROJECT_MSG: "Project not found",
    NOT_FOUND_PROJECTS_MSG: "You do not have any projects yet",
    BAD_REQUEST_MSG: "Bad Request",
    FORBIDDEN_MSG: "Forbidden",

    setError: function(status, message) {
        return Promise.reject({
            status: status,
            body: message
        })
    },

    //Success
    OK: 200,
    CREATE: 201,

    URI_MSG: "http://localhost:8080/",
    setSuccessUri: function(status, index, id) {
        return {
            status: status,
            body: this.URI_MSG.concat(index).concat(id.toString())
        }
    },

    setSuccessList: function(status, body) {
        return {
            status: status,
            body: body
        }
    }
}