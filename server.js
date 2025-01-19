const express = require('express');
const app = express();

const statusDescriptions = {
    200: 'OK: The request has succeeded. The meaning of this status depends on the HTTP method used.',
    201: 'Created: The request has succeeded and a new resource has been created as a result.',
    204: 'No Content: The server has successfully processed the request, but is not returning any content.',
    400: 'Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax).',
    401: 'Unauthorized: The request requires user authentication.',
    403: 'Forbidden: The server understands the request but refuses to authorize it.',
    404: 'Not Found: The server has not found anything matching the request URI.',
    405: 'Method Not Allowed: The method specified in the request is not allowed for the resource.',
    429: 'Too Many Requests: The user has sent too many requests in a given amount of time.',
    500: 'Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.',
    502: 'Bad Gateway: The server received an invalid response from an upstream server.',
    503: 'Service Unavailable: The server is not ready to handle the request.',
    504: 'Gateway Timeout: The server is acting as a gateway and cannot get a response in time.'
};

app.get('/status-info', (req, res) => {
    const code = parseInt(req.query.code, 10);

    if (isNaN(code)) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: Please provide a valid numeric status code.'
        });
    }

    const message = statusDescriptions[code];
    if (message) {
        res.status(200).json({
            status: code,
            message
        });
    } else {
        res.status(404).json({
            status: 404,
            message: 'Not Found: The provided status code is not recognized.'
        });
    }
});

app.get('/assistant/greet', (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({
            status: 400,
            message: 'Bad Request: Please provide a valid name.'
        });
    }

    res.status(200).json({
        status: 200,
        message: `Hello, ${name}! How can I assist you today?`
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
