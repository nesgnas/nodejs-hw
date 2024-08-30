module.exports = {
    data: {
        all: "/userData",           // Endpoint for getting all data and creating new data
        create: "/userData",        // Endpoint for creating new data
        delete: "/userData/:id",    // Endpoint for deleting data by ID
        update: "/userData/:id",    // Endpoint for updating data by ID
        byId: "/userData/:id",      // Endpoint for getting data by ID
        search: "/userData/search"  // Endpoint for searching data
    },
};
