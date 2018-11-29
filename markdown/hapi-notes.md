# Hapi
----------------------------
## What is Hapi?
 - Hapi is is a JS framework that handles routing, and has a great plugin system that lets you make a modular application

 - It uses other frameworks like Joi, for validation, and Boom for error handling, and there are many more

- it has built in blackbox testing with server.inject

- Hapi core is so small and lightweight, since it just has other plugins that are only added when needed


# install
- just use npm like any other project
- you no longer have to specify to get hapi v 17

```
yarn add hapi
```

- hapi has no required dependencies

## file structure
- until otherwise noted, this is the file structure:
    - hapi-practice-1
        - server.js


# starting your server
## v17
- to run a server in Hapi, you need to initialize a new instance with       
  
```new Hapi.server()```

- server() takes an optional argument, a **server configuration object** which 
  sets things like the server's host and port

    - [server configuration object docs](https://hapijs.com/api#server.options)

- here is the code for just getting the server started, most simple servers only need host and port:

```
FILE: hapi-practice/server.js

const Hapi = require('hapi');

// create a server with a host and port
const server = new Hapi.Server({
  host: 'localhost',
  port: 3101
});

// define server start function
async function start () {
    try {
        await server.start(); // the builtin server.start method is async
    } catch (err) {
        console.error(err);
        process.exit(1);
    };

    console.log('Server running at: ', server.info.uri);
}

// start your server
start();
```

- to make sure that your server runs, do: 

```
npm start
```

- FYI don't forget to use [nodemon](https://www.npmjs.com/package/nodemon) for your server, your start command should look like this in your package.json file: 

```
  ...
  "scripts": {
    "start": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

- all this does at this point is log the server uri to the console
- to get something to appear in the browser we need to set up some routes

# setting up basic routes
### v17 
- You have to add routes to your server using the **server.route()** method 
- This method takes an argument, the actual route object, which looks like this: 

```

```










