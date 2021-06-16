
module.exports = {

    rbac_opts: {
        "roles": ["admin", "Colaborator"],
        "permissions": [
            { "resource": "g5", "action": "GET" },
            { "resource": "g5", "action": "POST" },
            { "resource": "g5", "action": "DELETE" },
            { "resource": "g5", "action": "PUT" },
        ],
        "grants": {
            "Colaborator": [
                { "resource": "g5", "action": "GET" },
                { "resource": "g5", "action": "POST" },
                { "resource": "g5", "action": "DELETE" },
                { "resource": "g5", "action": "PUT" },

            ]
        }
    },
    strategies: {
        "google_oauth2": {
            "client_id": "your client id",
            "client_secret": "your client secret",
            "callbackUrl": "your callback url"
        },
        "office365_oauth2": {

            "client_id": "your client id",
            "client_secret": "your client secret",
            "callbackUrl": "your callback url",
            "tenant": "your tenant"
        },
        "office365_saml": {
            "callbackUrl": "your callback url",
            "entryPoint": "your entrypoint",
            "issuer": "your issuer",
            "certificate": "your certificate"
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

