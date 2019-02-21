const Hapi = require('hapi');

const server = Hapi.server({
    port: 8100,
    host: 'localhost',
});

const init = async () => {
    /* load the static file viewer inert */
    await server.register(require('inert'));

    /* load the routes */
    server.route(require('./routes/create'));
    server.route(require('./routes/list'));
    server.route(require('./routes/update'));
    server.route(require('./routes/pdfs'));
    server.route(require('./routes/health'));

    /* start the server */
    try {
        await server.start();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Server running at: ', server.info.uri);
};

init();
