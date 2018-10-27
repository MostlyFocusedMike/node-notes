const fs = require('fs');
const Path = require('path');

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
    return request.payload;
  }
}