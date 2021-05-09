'use strict'

const app = require('./pg-app')().then(app => {

    const PORT = 8080;
    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`)); //Listening on port 8080

});