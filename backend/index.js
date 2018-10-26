const Hapi = require('hapi');
const fs = require('fs');

const server = Hapi.server({
    port: 8100,
    host: 'localhost'
});

// actually starts the server 
const init = async () => {

  // this is how to add multiple plugins
  // inert is a package that lets us serve static assets, recomended by Hapi
  // hapi-pino is a pretty logger
  await server.register([
    {
      plugin: require('hapi-pino'),
      options: {
          prettyPrint: true, // false would just give an array with no newlines added, but seems to offer a little more info
          logEvents: ['pid','response', 'onPostStart']
      }
    },
    require('inert')
  ]);
  // this is how to do a single one; it's either an object, or an array of objects
  // await server.register(require('inert'));

  // with hapi-pino, we get nice logs without this anymore
  await server.start();
  // console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// run server 
init();

// these are routes 
// notice how there is no more reply() anymore
// also that h stands for hapi, and it's basically the reply() now 
// however, the file() function is only possible once you use inert 
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
      console.log(h)
      return h.file('./backend/index.html');
  }
});

server.route({
  method: 'POST',
  path: '/notes',
  handler: (request, h) => {
    console.log(request.payload)
    fs.writeFile(`./backend/markdown/${request.payload.title}.md`, request.payload.text, function(err) { // writeFile creates or overwrites, but appendFile creates or appends
      if (err) {return console.log(err)};
      console.log("The file was saved!");
    }); 
    return request.payload;
  }
});