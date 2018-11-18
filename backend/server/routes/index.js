const fs = require('fs');
const Path = require('path');

module.exports.home = {
  method: 'GET',
  path: '/',
  options: {
    cors: true
  },
  handler: (request, h) => {
    console.log('i am indeed running')
      return h.file('./index.html');
  }
}

module.exports.createNote = {
  method: 'POST',
  path: '/notes',
  options: {
    cors: true
  },
  handler: (request, h) => {
    const files = require('../../../src/files.json')
    try {
      fs.writeFile(`./markdown/${request.payload.title}.md`, "", () => {
        if (!files.includes(request.payload.title)) {
          const newFiles = [...files, request.payload.title].sort()
          fs.writeFileSync('./src/files.json', JSON.stringify(newFiles), () => {
            return request.payload;
          })
        } else {
          return "You already created that file"
        }
      })
    } catch (err) {
      console.log(err);
    }
  }  
}

module.exports.updateNote = {
  method: 'PATCH',
  path: '/notes/{noteName}',
  options: {
    cors: true
  },
  handler: (request, h) => {
    console.log('I was hit on patch')
    const files = require('../../../src/files.json')

    fs.writeFile(`./markdown/${request.payload.title}.md`, request.payload.text, function(err) { 
      if (err) {return console.log(err)};
      console.log("The file was saved!");
    }); 
    console.log('files', files)
    if (!files.includes(request.payload.title)) {
      const newFiles = [...files, request.payload.title].sort()
      fs.writeFile('./src/files.json', JSON.stringify(newFiles), function(err) { 
        if (err) {return console.log(err)};
        console.log("The file was added to the directory!");
      });
    } 
    return request.payload;
  }
}

module.exports.reload = {
  method: 'PUT',
  path: '/reload',
  options: {
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
      if (JSON.stringify(newFiles) !== JSON.stringify(existingFiles)) {
        fs.writeFile('./src/files.json', JSON.stringify(newFiles), function(err) { 
          if (err) {return console.log(err)};
          console.log("Files.json was updated");
        });
      }
    })
    return h.response("Success").code(201)
  }
}