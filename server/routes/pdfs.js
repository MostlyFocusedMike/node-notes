const Path = require('path');

module.exports = {
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: Path.join(__dirname, '../../pdfs'),
            redirectToSlash: true,
            /* if we weren't using a relative path */
            // path: 'lib/public',
            /* if you weren't using a standard index.html */
            // index: 'default.html',
            /* if you wanted to see all your files instead of an index file */
            listing: true,
            /* listing will now show hidden files */
            // showHidden: true,
            /* param 'example' will also try example.html */
            // defaultExtension: 'html',
        },
    },
};
