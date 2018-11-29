# Hapi
### What is Hapi?
 - Hapi is is a JS framework that handles routing, and has a great plugin system that lets you make a modular application

 - It uses other frameworks like Joi, for validation, and Boom for error handling, and there are many more

- it has built in blackbox testing with server.inject

- Hapi core is so small and lightweight, since it just has other plugins that are only added when needed


# SECTION 1: THE BASICS
- [My github for this section](https://github.com/MostlyFocusedMike/hapi-notes-1)
- primary sources: 
    - [Future Studio's article](https://futurestud.io/tutorials/hapi-route-handling-and-drive-traffic-to-your-server)
    - [hapi docs](https://hapijs.com/api)
--------------------------------------------------------------------------------------------------------------
# Installation
- just use npm like any other project
- you no longer have to specify to get hapi v 17

```
yarn add hapi
// or 
npm install -S hapi 
```

- hapi has no required dependencies

## file structure
- until otherwise noted, this is the file structure:
    - hapi-practice-1
        - server.js




--------------------------------------------------------------------------------------------------------------
# Starting your server
### v17
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





------------------------------------------------------------------------------------------------------
# Basic routes
### v17 
- You have to add routes to your server using the **server.route([route config object])** method 
- This method takes an argument, the actual route object, which looks like this: 
    - [server.route() docs](https://hapijs.com/api#-serverrouteroute)

```
server.route({  
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'I am the home route'
  }
})
```
### here are the properties of the **route configuration object**, largely from the docs: 

- method [required]
    - the HTTP method, so 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', or 'OPTIONS' (use caps)
    - Any HTTP method is allowed, except for 'HEAD'. 
    - Use '*' to match against any HTTP method (only when an exact match was not found, and any match with a specific method will be given a higher priority over a wildcard match). 
    - Can be assigned an array of methods which has the same result as adding the same route with different methods manually.

- path [required]
    - the absolute path used to match incoming requests (must begin with '/').
    - Incoming requests are compared to the configured paths based on the server's router configuration. 
    - Use named parameters enclosed with {}, ie '/people/{id}' 

- handler [required if handler property is not set in options]  
    - the route handler function called to generate the response after successful authentication and validation.

- options [optional] 
    - The options value is usually an object 
    - it can instead be a function that returns an object
        - the function's signature must be **function(server)**, 
        - where **server** is the server the route is being added to.
    - the options object is where you can define authentication, validations, tags, notes, descriptions, and even the handler
    - the handler goes in either **options** or the main *route config object**, not both

vhost - [optional]
     - see docs for more info

# Add your routes to your server.js file
- add your routes before the server starts like so: 

```
const Hapi = require('hapi');

// create a server with a host and port
const server = new Hapi.Server({
    host: 'localhost',
    port: 3101
  });

server.route({  
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'I am the home route'
    },
});

server.route({  
    method: 'GET',
    path: '/example',
    handler: (request, h) => {
      return 'I am an example url'
    },
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

**Note**: while it is possible to pass an array of routes, like **server.route([routeConf1, routeConf2])**, it's not best practice, in the next section, we'll separate them out into their own files.




-----------------------------------------------------------------------------------------------------------
# SECTION 2: ROUTE HANDLING
- [My github for this section](https://github.com/MostlyFocusedMike/hapi-notes-2)
- primary sources: 
    - [Future Studio's main article](https://futurestud.io/tutorials/hapi-route-handling-and-drive-traffic-to-your-server)
    - [Route handler section from this Future Studio article](https://futurestud.io/tutorials/hapi-v17-upgrade-guide-your-move-to-async-await)
    - [routing section in the hapi docs tutorial](https://hapijs.com/tutorials/routing)
    - [hapi docs](https://hapijs.com/api)




-----------------------------------------------------------------------------------------------------------
# Route handler methods 
- In the **route config object** you can pass either one or many HTTP methods to a route
- to pass several, just use an array. You will be fine as long as there are no HTTP verb collisions: 

```
server.route({  
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'It is I, the homepage'
    }
})

server.route({  
    method: [ 'POST', 'PUT' ],
    path: '/',
    handler: (request, h) => {
    // process the request’s payload …

    return 'Both POST and PUT will trigger this handler'
    }
})

```
- This isn't super common, but it's good to know about




-----------------------------------------------------------------------------------------------------------
# Path parameters
- Most modern applications will require dynamic routing, where one or more sections of a url will change
- Hapi uses {} to mark what sections of a path are the parameters, and you can access them from the handler's request object like so:

```
server.route({  
    method: 'GET',
    path: '/schools/{schoolName}/users/{username}',
    handler: (request, h) => {
        // these vars keep the line length short
        const user = request.params.username;
        const school = request.params.schoolName;

        return `${user} wishes ${school} wasn't so expensive.`;
    }
});
```

- so when we enter the url http://localhost:3101/schools/harvard/users/tom, our page outputs: 

```
tom wishes harvard wasn't so expensive.
```

- parameters must be valid JS variable names
    - schoolName works, school-name does not

## Optional parameters 
- sometimes, parameters are optional, if that is the case use a '?' at the end
- optional parameters must be the very last parameter 

```
server.route({
    method: 'GET',
    path: '/my-age/{age?}',
    handler: function (request, h) {

        const age = request.params.age ?
            encodeURIComponent(request.params.age) :
            'not telling you how old I am';

        return `I'm ${age}!`;
    }
});
```

## Partial and multiple parameters in a url segment 
- Sometimes only part of a parameter needs to be dynamic: 

```
server.route({
    method: 'GET',
    path: '/my-file/{fileName}.jpg',
    handler: function (request, h) {

        const file = encodeURIComponent(request.params.fileName)

        return `Loading up ${file}.jpg!`;
    }
});
```
- other times, you'll want more than one parameter in a segment

```
server.route({
    method: 'GET',
    path: '/my-file/{fileName}.{ext}',
    handler: function (request, h) {

        const file = encodeURIComponent(request.params.fileName);
        const ext = encodeURIComponent(request.params.ext);
        return `Loading up ${file}.${ext}!`;
    }
});
```

## Multi-segment parameters 
- A single parameter can span multiple segments, you just have to say how many with '*'
- you just have to split the param with **split('/')**
```
server.route({
    method: 'GET',
    path: '/my-foods/{favFoods*2}',
    handler: function (request, h) {

        const foods = request.params.favFoods.split('/');
        const food1 = encodeURIComponent(foods[0]);
        const food2 = encodeURIComponent(foods[1]);
        return `${food1} and ${food2} are the best!`;
    }
});
```

- so when we visit http://localhost:3101/my-foods/pizza/ice-cream, we get: 

```
pizza and ice-cream are the best!
```


------------------------------------------------------------------------------------------------------------
# Route handlers 








