
module.exports = {

    rbac_opts : {
        "roles": ["admin", "Developer", "guest"],
        "permissions": [
        { "resource": "auth-types", "action": "GET" },
        { "resource": "permissions", "action": "GET" },
        { "resource": "permissions", "action": "POST" },
        { "resource": "permissions", "action": "PUT" },
        { "resource": "permissions", "action": "DELETE" },
        { "resource": "roles", "action": "GET" }, 
        { "resource": "roles", "action": "POST" },
        { "resource": "users", "action": "GET" },
        { "resource": "users", "action": "POST" },
        { "resource": "users", "action": "PUT" },
        { "resource": "users", "action": "DELETE" },
        ],
        "grants": {
        "Developer": [
            { "resource": "roles", "action": "GET" }, 
            { "resource": "roles", "action": "POST" },
            { "resource": "users", "action": "GET" },
            { "resource": "users", "action": "POST" },
            { "resource": "users", "action": "PUT" },
            { "resource": "users", "action": "DELETE" },
        ],
        "guest": [
            { "resource": "roles", "action": "GET" }, 
            { "resource": "roles", "action": "POST" },
            { "resource": "users", "action": "GET" },
            { "resource": "users", "action": "POST" },
            { "resource": "users", "action": "PUT" },
            { "resource": "users", "action": "DELETE" },
        ]
        }
       },
      strategies : {
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
        "certificate":"your certificate"
        }
        },
         dbConfigs : {
            "host":'localhost',
            "port": 5432,
            "user":'postgres',
            "password":'1234',
            "connectionLimit": 5,
            "database":'plug',
            "dbms": 'postgres'
        }



       

}

