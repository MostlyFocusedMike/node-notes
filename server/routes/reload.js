const fs = require('fs');
const Boom = require('boom');

module.exports = {
    method: 'PUT',
    path: '/reload',
    options: {
        cors: true,
        description: 'Allow user to check for new files that have been added to the markdown file manually',
        handler: (request, h) => {
            const testFolder = './markdown/';
            const newFiles = [];
            const existingFiles = require('../../src/files.json');
            try {
                const files = fs.readdirSync(testFolder);
                files.forEach(file => newFiles.push(file.replace('.md', '')));
                if (JSON.stringify(newFiles) !== JSON.stringify(existingFiles)) {
                    fs.writeFileSync('./src/files.json', JSON.stringify(newFiles));
                }
                return h.response('Successful Reload').code(201);
            } catch (err) {
                throw new Boom(err, { statusCode: 501 });
            }
        },
    },

};
