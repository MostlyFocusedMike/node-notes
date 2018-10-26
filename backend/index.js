const Hapi = require('hapi');
const fs = require('fs');
const Path = require('path');

const server = Hapi.server({
  port: 8100,
  host: 'localhost',
  routes: {
    files: {
        relativeTo: Path.join(__dirname)
    }
  }
});

const init = async () => {
  await server.register([
    // {
    //   plugin: require('hapi-pino'),
    //   options: {
    //       prettyPrint: true, // false would just give an array with no newlines added, but seems to offer a little more info
    //       logEvents: ['pid','response', 'onPostStart']
    //   }
    // },
    require('inert')
  ]);

  await server.start();
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
      console.log('path', Path.parse(__filename))
      console.log('dir', Path.parse(__dirname))
      console.log('joined',  Path.join(__dirname))
      return h.file('./index.html');
  }
});

server.route({
  method: 'POST',
  path: '/notes',
  handler: (request, h) => {
    console.log(request.payload)
    fs.writeFile(`./backend/markdown/${request.payload.title}.md`, request.payload.text, function(err) { 
      if (err) {return console.log(err)};
      console.log("The file was saved!");
    }); 
    return request.payload;
  }
});