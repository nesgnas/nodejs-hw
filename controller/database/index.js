const { StatusCode, readFile, writeFile, deleteObject, getBody } = require("../../utils.js");
const {Message} = require("../../utils");

// Get all data
async function getAllData(request, response) {
    try {
        const data = await readFile();
        response.writeHead(StatusCode.OK, {
            "Content-Type": "application/json",
        });
        response.end(JSON.stringify(data));
    } catch (error) {
        console.error("Error getting all data", error);
        response.writeHead(StatusCode.INTERNAL_SERVER_ERROR, {
            "Content-Type": "text/plain",
        });
        response.end(Message.INTERNAL_SERVER_ERROR);
    }
}

// Create new data
async function createData(request, response) {
    try {
        const body = await getBody(request);
        const { username, password, token } = JSON.parse(body);

        if (username === undefined || password === undefined || token === undefined) {
            response.writeHead(StatusCode.BAD_REQUEST, {
                "Content-Type": "text/plain",
            });
            response.end(Message.MISSING_FIELD);
            return;
        }

        let dataList = await readFile();
        let existingData = dataList.find((item) => item.username === username || item.token === token);
        if (existingData) {
            response.writeHead(StatusCode.BAD_REQUEST, {
                "Content-Type": "text/plain",
            });
            response.end(Message.DATA_EXIST);
        } else {
            const id = dataList.length ? Math.max(dataList.map(item => item.id)) + 1 : 1;
            dataList.push({ id, username, password, token });
            await writeFile(dataList);
            response.writeHead(StatusCode.CREATED, {
                "Content-Type": "application/json",
            });
            response.end(JSON.stringify({ id }));
        }
    } catch (error) {
        console.error("Error creating data", error);
        response.writeHead(StatusCode.INTERNAL_SERVER_ERROR, {
            "Content-Type": "text/plain",
        });
        response.end(Message.INTERNAL_SERVER_ERROR);
    }
}

// Delete data by ID
async function deleteData(request, response) {
    try {
        const idFromUrl = new URL(request.url, `http://${request.headers.host}`).searchParams.get('id');
        if (!idFromUrl) {
            response.writeHead(StatusCode.BAD_REQUEST, {
                "Content-Type": "text/plain",
            });
            response.end(Message.BAD_REQUEST);
            return;
        }
        const id = Number(idFromUrl);
        await deleteObject(id);
        response.writeHead(StatusCode.NO_CONTENT, {
            "Content-Type": "application/json",
        });
        response.end();
    } catch (error) {
        console.error("Error deleting data", error);
        response.writeHead(StatusCode.INTERNAL_SERVER_ERROR, {
            "Content-Type": "text/plain",
        });
        response.end(Message.INTERNAL_SERVER_ERROR);
    }
}

// Update data by ID
async function updateData(request, response) {
    try {
        const idFromUrl = new URL(request.url, `http://${request.headers.host}`).searchParams.get('id');
        const body = await getBody(request);
        const { username, password, token } = JSON.parse(body);

        if (!idFromUrl) {
            response.writeHead(StatusCode.BAD_REQUEST, {
                "Content-Type": "text/plain",
            });
            response.end(Message.BAD_REQUEST);
            return;
        }

        const id = Number(idFromUrl);
        let dataList = await readFile();
        let existingData = dataList.find((item) => item.id === id);

        if (existingData) {
            existingData.username = username || existingData.username;
            existingData.password = password || existingData.password;
            existingData.token = token || existingData.token;
            await writeFile(dataList);
            response.writeHead(StatusCode.NO_CONTENT, {
                "Content-Type": "application/json",
            });
            response.end();
        } else {
            response.writeHead(StatusCode.NOT_FOUND, {
                "Content-Type": "text/plain",
            });
            response.end(Message.DATA_NOT_FOUND);
        }
    } catch (error) {
        console.error("Error updating data", error);
        response.writeHead(StatusCode.INTERNAL_SERVER_ERROR, {
            "Content-Type": "text/plain",
        });
        response.end(Message.INTERNAL_SERVER_ERROR);
    }
}

// Get data by ID
async function getDataById(request, response) {
    try {
        const idFromUrl = new URL(request.url, `http://${request.headers.host}`).searchParams.get('id');
        if (!idFromUrl) {
            response.writeHead(StatusCode.BAD_REQUEST, {
                "Content-Type": "text/plain",
            });
            response.end(Message.BAD_REQUEST);
            return;
        }
        const id = Number(idFromUrl);
        let dataList = await readFile();
        let data = dataList.find((item) => item.id === id);
        if (data) {
            response.writeHead(StatusCode.OK, {
                "Content-Type": "application/json",
            });
            response.end(JSON.stringify(data));
        } else {
            response.writeHead(StatusCode.NOT_FOUND, {
                "Content-Type": "text/plain",
            });
            response.end("Data not found");
        }
    } catch (error) {
        console.error("Error getting data by ID", error);
        response.writeHead(StatusCode.INTERNAL_SERVER_ERROR, {
            "Content-Type": "text/plain",
        });
        response.end(Message.INTERNAL_SERVER_ERROR);
    }
}

// Search data by query
async function searchData(request, response) {
    try {
        const query = new URL(request.url, `http://${request.headers.host}`).searchParams.get('query');
        if (!query) {
            response.writeHead(StatusCode.BAD_REQUEST, {
                "Content-Type": "text/plain",
            });
            response.end(Message.BAD_REQUEST);
            return;
        }
        let dataList = await readFile();
        let results = dataList.filter((item) => item.username.includes(query) || item.token.includes(query));
        response.writeHead(StatusCode.OK, {
            "Content-Type": "application/json",
        });
        response.end(JSON.stringify(results));
    } catch (error) {
        console.error("Error searching data", error);
        response.writeHead(StatusCode.INTERNAL_SERVER_ERROR, {
            "Content-Type": "text/plain",
        });
        response.end(Message.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAllData,
    createData,
    deleteData,
    updateData,
    getDataById,
    searchData
};
