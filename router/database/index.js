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

const userRouter = {
    run(req, res) {
        try {
            // Define the routes and methods for handling requests
            routerMethods.GET(req, res, routes.data.all, getAllData); // Route for getting all data
            routerMethods.POST(req, res, routes.data.create, createData); // Route for creating data
            routerMethods.DELETE(req, res, routes.data.byId, deleteData); // Route for deleting data
            routerMethods.PUT(req, res, routes.data.byId, updateData); // Route for updating data
            routerMethods.GET(req, res, routes.data.byId, getDataById); // Route for getting data by ID
            routerMethods.GET(req, res, routes.data.search, searchData); // Route for searching data
        } catch (error) {
            console.error("Error in routing:", error);
            res.writeHead(StatusCode.INTERNAL_SERVER_ERROR, {
                "Content-Type": "text/plain",
            });
            res.end("Internal server error");
        }
    },
};

module.exports = userRouter;
