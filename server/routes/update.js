const fs = require('fs');

module.exports = {
    method: 'PATCH',
    path: '/notes/{noteName}',
    options: {
        cors: true,
    },
    handler: (request, h) => {
        const { title, text, oldTitle } = request.payload;
        const files = require('../../src/files.json');
        try {
            fs.writeFileSync(`./markdown/${title}.md`, text);
            console.log('The file was saved!');
        } catch (err) {
            if (err) throw err;
            console.log('The file has been saved!');
        }

        if (title !== oldTitle) { // if a user updates the file's name
            fs.unlinkSync(`./markdown/${oldTitle}.md`);
            const oldTitleIdx = files.indexOf(oldTitle);
            files.splice(oldTitleIdx, 1);
            const newFiles = [...files, title].sort();
            try {
                fs.writeFileSync('./src/files.json', JSON.stringify(newFiles));
                console.log('The file was added to the directory!');
            } catch (err2) {
                if (err2) throw err2;
                console.log('The file has been saved!');
            }
        }

        // if (!files.includes(request.payload.title)) {
        //   const newFiles = [...files, request.payload.title].sort()
        //   try {
        //     fs.writeFileSync('./src/files.json', JSON.stringify(newFiles))
        //     console.log('The file was added to the directory!');
        //   } catch (err) {return console.log(err)};
        // }
        return request.payload;
    },
};
