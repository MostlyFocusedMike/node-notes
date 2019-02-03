const notesUrl = 'http://localhost:8100';

class NotesAdapter {
    static getOne(title) {
        const files = require('../files.json');
        if (files.includes(title)) {
            const path = require(`../../markdown/${title}.md`); // eslint-disable-line import/no-dynamic-require
            return fetch(path)
                .then(response => response.text())
                .catch(console.log);
        }
        return Promise.resolve('# Missing File');
    }

    static list() {
        return fetch(`${notesUrl}/notes`)
            .then(r => r.json())
            .catch((err) => {
                /*
                    if we're on GitHub, then we won't have access to the server,
                    so we fall back to whatever the latest files.json
                    A fetch error like this is a TypeError, if we somehow get
                    another error, it will log it
                */
                if (err.constructor === TypeError) {
                    const files = require('../files.json');
                    return { files };
                }
                return err;
            });
    }

    static create(title) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(title),
        };


        return fetch(`${notesUrl}/notes`, options)
            .then(r => r.json())
            .catch(console.log);
    }

    static update(note) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        };
        return fetch(`${notesUrl}/notes/${note.title}`, options)
            .then(r => r.json())
            .catch(console.log);
    }
}

export default NotesAdapter;
