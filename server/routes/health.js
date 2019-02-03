const fs = require('fs');

module.exports = {
    method: 'GET',
    path: '/health',
    options: {
        cors: true,
    },
    handler: (request, h) => {
        return { health: "good" };
    },
};
