const fs = require('fs');
const Path = require('path');

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
    const files = require('../../../src/files.json')

    fs.writeFile(`./markdown/${request.payload.title}.md`, request.payload.text, function(err) { 
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

module.exports.reload = {
  method: 'GET',
  path: '/reload',
  config: {
    cors: true
  },
  handler: (request, h) => {
    const testFolder = './markdown/';
    const newFiles = []
    const existingFiles = require('../../../src/files.json')
    fs.readdir(testFolder, (err, files) => {
      files.forEach(file => {
        newFiles.push(file.replace(".md", ""))
      });
      console.log('existing files:', existingFiles)
      console.log('new files:', newFiles)
      if (JSON.stringify(newFiles) !== JSON.stringify(existingFiles)) {
        fs.writeFile('./src/files.json', JSON.stringify(newFiles), function(err) { 
          if (err) {return console.log(err)};
          console.log("Files.json was updated");
        });
      } else {
        console.log('No difference ')
      }
    })
    return h.response("files new").code(201)
  }
}