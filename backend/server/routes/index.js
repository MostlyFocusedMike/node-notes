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
    fs.writeFile(`./markdown/${request.payload.file}`, request.payload.text, function(err) { 
      if (err) {return console.log(err)};
      console.log("The file was saved!");
    }); 
    console.log('files', files)
    if (!files.includes(request.payload.file)) {
      const newFiles = [...files, request.payload.file]
      fs.writeFile('./src/files.json', JSON.stringify(newFiles), function(err) { 
        if (err) {return console.log(err)};
        console.log("The file was added to the directory!");
      });
    } 
    return request.payload;
  }
}

module.exports.notes = {
  method: 'GET',
  path: '/reload',
  config: {
    cors: true
  },
  handler: (request, h) => {
    const testFolder = './markdown/';
    
    fs.readdir(testFolder, (err, files) => {
      files.forEach(file => {
        file = file.replace(".md", "")
        console.log(file);
      });
    })
    return "hi"
  }
}