module.exports = {
    data: {
        all: `${URI.USER}`,           // Endpoint for getting all data and creating new data
        create: `${URI.USER}`,        // Endpoint for creating new data
        delete: `${URI.USER}/:id`,    // Endpoint for deleting data by ID
        update: `${URI.USER}/:id`,    // Endpoint for updating data by ID
        byId: `${URI.USER}/:id`,      // Endpoint for getting data by ID
        search: `${URI.USER}/search`  // Endpoint for searching data
    },
};
