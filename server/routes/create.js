const fs = require('fs');

module.exports = {
    method: 'POST',
    path: '/notes',
    options: {
        cors: true,
        description: 'Create a new note',
        handler: (request, h) => {
            const files = require('../../src/files.json');
            try {
                if (!files.includes(request.payload.title)) {
                    fs.writeFileSync(`./markdown/${request.payload.title}.md`, '');
                    const newFiles = [...files, request.payload.title].sort();
                    fs.writeFileSync('./src/files.json', JSON.stringify(newFiles));
                    return request.payload;
                }
            } catch (err) {
                console.log(err);
                return { error: err };
            }
            return { msg: 'You already created that file.' };
        },
    },
};
