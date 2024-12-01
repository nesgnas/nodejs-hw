const routerMethods = require("../methods");
const routes = require("../routers");
const {
    createData,
    getAllData,
    deleteData,
    updateData,
    getDataById, // Example additional method
    searchData // Example additional method
} = require("../../controller/database/index.js");
const {Message} = require("../../utils");

const userRouter = {
    run(request, response) {
        try {
            // Define the routes and methods for handling requests
            routerMethods.GET(request, response, routes.data.all, getAllData); // Route for getting all data
            routerMethods.POST(request, response, routes.data.create, createData); // Route for creating data
            routerMethods.DELETE(request, response, routes.data.byId, deleteData); // Route for deleting data
            routerMethods.PUT(request, response, routes.data.byId, updateData); // Route for updating data
            routerMethods.GET(request, response, routes.data.byId, getDataById); // Route for getting data by ID
            routerMethods.GET(request, response, routes.data.search, searchData); // Route for searching data
        } catch (error) {
            console.error("Error in routing:", error);
            response.writeHead(StatusCode.INTERNAL_SERVER_ERROR, {
                "Content-Type": "text/plain",
            });
            response.end(Message.INTERNAL_SERVER_ERROR);
        }
    },
};

module.exports = userRouter;
