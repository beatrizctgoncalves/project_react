//const loginGoogle = '<a href=' + GOOGLE_LOGIN_PATH +'>Login Google Account</a>';
//const loginGithub = '<a href= /loginGoogle >Logout google account</a>'
//                    + '<p><a href= /loginGit>Login github account</a></p>';
//const logout = '<a href= /loginGoogle >Logout google account</a>'
//                    + '<p><a href= /loginGit>Logout github account</a></p>';

module.exports = (utils, jwt) => {
    const cookieSessionIdStr = 'connect.sid';
    const URL = utils.url;
    const users = {};
    function getCookieSessionId(req) {
        return req.cookies[cookieSessionIdStr]
    }
    function getOrCreateUser(req) {
        const cookieSessionId = getCookieSessionId(req);
        if(!users[cookieSessionId]) {
            users[cookieSessionId] = {}
        }
        return users[cookieSessionId];
    }
    function loginGoogle(req, rsp, body) {
        const user = getOrCreateUser(req);
        const json = JSON.parse(body);
        user.google = jwt.decode(json.id_token);
    }
    function logoutGoogle(req) {
        const user = getOrCreateUser(req);
        user.google = undefined;
    }
    function loginGitHub(req, rsp, body) {
        const user = getOrCreateUser(req);
        user.github = JSON.parse(body);
    }
    function logoutGitHub(req) {
        const user = getOrCreateUser(req);
        user.github = undefined;
    }
    function logout(req, rsp) {
        const sessionId = getCookieSessionId(req);
        users[sessionId] = undefined;
        req.cookies[cookieSessionIdStr].destroy();
        rsp.redirect('/');
    }
    return {
        getOrCreateUser: getOrCreateUser,
        loginGoogle: loginGoogle,
        logoutGoogle: logoutGoogle,
        loginGitHub: loginGitHub,
        logoutGitHub: logoutGitHub,
        logout: logout
    }
}