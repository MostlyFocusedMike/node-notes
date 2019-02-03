const fs = require('fs');
const Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/notes',
    options: {
        cors: true,
        description: 'get a list of all the note names, and update the pseudo-db file: files.json',
        handler: (request, h) => {
            const markdownFolder = './markdown/';
            const savedFiles = require('../../src/files.json');
            const fileNames = [];
            try {
                const files = fs.readdirSync(markdownFolder);
                files.forEach(file => fileNames.push(file.replace('.md', '')));
                if (JSON.stringify(fileNames) !== JSON.stringify(savedFiles)) {
                    fs.writeFileSync('./src/files.json', JSON.stringify(fileNames));
                }
                return { files: fileNames };
            } catch (err) {
                throw new Boom(err, { statusCode: 501 });
            }
        },
    },

};
