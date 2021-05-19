
module.exports = {

    rbac_opts : {
        "roles": ["admin", "Developer", "guest"],
        "permissions": [
            { "resource": "/api/g5/pluggable/gamification/groups", "action": "GET" }, 
            { "resource": "/api/g5/pluggable/gamification/groups", "action": "POST" },
        ],
        "grants": {
        "Developer": [
            { "resource": "/api/g5/pluggable/gamification/groups", "action": "GET" }, 
            { "resource": "/api/g5/pluggable/gamification/groups", "action": "POST" },
        ],
        "Colaborator":[
            { "resource": "/api/g5/pluggable/gamification/groups", "action": "GET" }, 
            { "resource": "/api/g5/pluggable/gamification/groups", "action": "POST" },

        ],
        "guest": [
            { "resource": "/api/g5/pluggable/gamification/groups", "action": "GET" }, 
            { "resource": "/api/g5/pluggable/gamification/groups", "action": "POST" },
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

