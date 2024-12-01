const url = require("url");
var routerMethods = {
    GET: function (request, response, path, callback) {
        if (path === url.parse(request.url, true).pathname && request.method === "GET") {
            callback(request, response);
        }
    },
    POST: function (request, response, path, callback) {
        if (path === request.url && request.method === "POST") {
            callback(request, response);
        }
    },
    DELETE: function (request, response, path, callback) {
        if (path === url.parse(request.url, true).pathname && request.method === "DELETE") {
            callback(request, response);
        }
    },
    PUT: function (request, response, path, callback) {
        if (path === url.parse(request.url, true).pathname && request.method === "PUT") {
            callback(request, response);
        }
    },
};

module.exports = routerMethods;
