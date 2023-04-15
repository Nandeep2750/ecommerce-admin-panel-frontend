const CracoLessPlugin = require('craco-less');

// Don't open the browser during development
process.env.BROWSER = "none";

/* craco.config.js */
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};