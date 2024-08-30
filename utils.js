const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve(__dirname, './dataFile/data.json');

const StatusCode = Object.freeze({
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
});

// Read the entire data from the file
async function readFile() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file", error);
        throw error;
    }
}

// Write data to the file
async function writeFile(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing file", error);
        throw error;
    }
}

// Delete specific object from the file
async function deleteObject(id) {
    try {
        let data = await readFile();
        data = data.filter(item => item.id !== id);
        await writeFile(data);
    } catch (error) {
        console.error("Error deleting object", error);
        throw error;
    }
}

// Helper function to get the body from the request
async function getBody(request) {
    return new Promise((resolve, reject) => {
        let body = "";

        request.on("data", (chunk) => {
            body += chunk.toString();  // Assuming UTF-8 encoding
        });

        request.on("end", () => {
            // Check if body is valid JSON if you expect JSON payloads
            try {
                JSON.parse(body);  // This can be removed or adjusted based on your needs
            } catch (e) {
                reject(new Error("Invalid JSON"));
                return;
            }
            resolve(body);
        });

        request.on("error", (error) => {
            reject(error);
        });
    });
}


module.exports = {
    StatusCode,
    readFile,
    writeFile,
    deleteObject,
    getBody
};
