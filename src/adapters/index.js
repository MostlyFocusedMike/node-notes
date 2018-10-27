const notesUrl = "http://localhost:8100"

export class NotesAdapter {
  static getOne(route) {
    return fetch(`${notesUrl}/notes/${route}`).then(r=>r.json())
  }
  static create(note) {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }
    return fetch(`${notesUrl}/notes`, options)
      .then(r => r.json())
  }
}