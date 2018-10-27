const fs = require('fs');
const Path = require('path');
const files = require('../../../src/files.json')

module.exports.home = {
  method: 'GET',
  path: '/',
  config: {
    cors: true
  },
  handler: (request, h) => {
      console.log('path', Path.parse(__filename))
      console.log('dir', Path.parse(__dirname))
      console.log('joined',  Path.join(__dirname))
      return h.file('./index.html');
  }
}

module.exports.notes = {
  method: 'POST',
  path: '/notes',
  config: {
    cors: true
  },
  handler: (request, h) => {
    console.log(request.payload)
    fs.writeFile(`./backend/markdown/${request.payload.newNote.title}.md`, request.payload.newNote.text, function(err) { 
      if (err) {return console.log(err)};
      console.log("The file was saved!");
    }); 
    console.log('files', files)
    const newFiles = [...files, request.payload.newNote.title]
    fs.writeFile('./src/files.json', JSON.stringify(newFiles), function(err) { 
      if (err) {return console.log(err)};
      console.log("The file was added to the directory!");
    });
    return request.payload;
  }
}