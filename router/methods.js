const url = require("url");
var routerMethods = {
    GET: function (req, res, path, callback) {
        if (path === url.parse(req.url, true).pathname && req.method === "GET") {
            callback(req, res);
        }
    },
    POST: function (req, res, path, callback) {
        if (path === req.url && req.method === "POST") {
            callback(req, res);
        }
    },
    DELETE: function (req, res, path, callback) {
        if (path === url.parse(req.url, true).pathname && req.method === "DELETE") {
            callback(req, res);
        }
    },
    PUT: function (req, res, path, callback) {
        if (path === url.parse(req.url, true).pathname && req.method === "PUT") {
            callback(req, res);
        }
    },
};

module.exports = routerMethods;
