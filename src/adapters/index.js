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

    static reload() {
        const options = {
            method: 'PUT',
        };
        return fetch(`${notesUrl}/reload`, options)
            .then(r => r.text())
            .catch(console.log);
    }
}

export default NotesAdapter;
