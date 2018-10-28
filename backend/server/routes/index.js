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
    fs.writeFile(`./backend/markdown/${request.payload.title}.md`, request.payload.text, function(err) { 
      if (err) {return console.log(err)};
      console.log("The file was saved!");
    }); 
    console.log('files', files)
    if (!files.includes(request.payload.title)) {
      const newFiles = [...files, request.payload.title]
      fs.writeFile('./src/files.json', JSON.stringify(newFiles), function(err) { 
        if (err) {return console.log(err)};
        console.log("The file was added to the directory!");
      });
    } 
    return request.payload;
  }
}