const fs = require('fs');

function sleep(ms) {
    /*  Deal with the race condition of waiting for the system to
        create a file that can't be synced up with the JS program
        starts it
    */
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    method: 'POST',
    path: '/notes',
    options: {
        cors: true,
        description: 'Create a new note',
        handler: async (request, h) => {
            const files = require('../../src/files.json');
            try {
                if (!files.includes(request.payload.title)) {
                    console.log('files: ', files);
                    fs.writeFileSync(`./markdown/${request.payload.title}.md`, '');
                    const newFiles = [...files, request.payload.title].sort();
                    fs.writeFileSync('./src/files.json', JSON.stringify(newFiles));
                    await sleep(1500);
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
