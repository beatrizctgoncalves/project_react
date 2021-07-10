
module.exports = {

    rbac_opts: {
        "roles": ["admin", "Colaborator"],
        "permissions": [
            { "resource": "g5", "action": "GET" },
            { "resource": "g5", "action": "POST" },
            { "resource": "g5", "action": "DELETE" },
            { "resource": "g5", "action": "PATCH" },
        ],
        "grants": {
            "Colaborator": [
                { "resource": "g5", "action": "GET" },
                { "resource": "g5", "action": "POST" },
                { "resource": "g5", "action": "DELETE" },
                { "resource": "g5", "action": "PATCH" },

            ]
        }
    },
    strategies: {
        "google_oauth2": {
            "client_id": "554268781138-04p7fucscv8m3sg0ei9rb3vbkrpiu2fo.apps.googleusercontent.com",
            "client_secret": "1jfXzs1SgsX4wtk1jDXPud_x",
            "callbackUrl": "http://localhost:8080/users/g5/pluggable/gamification/google/callback"
          }
    },
    dbConfigs: {
        "host": 'localhost',
        "port": 5432,
        "user": 'postgres',
        "password": '1234',
        "connectionLimit": 5,
        "database": 'plug',
        "dbms": 'postgres'
    }
}

