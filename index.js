const router = require("./router/index.js");
const createServer = require("http").createServer;

function requestHandler(request, response) {
    router.run(request, response);
}

// Starts a simple HTTP server locally on port 4999
createServer(requestHandler).listen(4999, "127.0.0.1", function() {
    console.log("Listening on 127.0.0.1:4999");
});


// Run with `node server.js`
