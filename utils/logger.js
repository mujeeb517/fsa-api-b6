const bunyan = require('bunyan');

var logger = bunyan.createLogger(
    {
        name: "fsa-api",
        streams: [{
            path: './logs/app.log',
        },
        {
            stream: process.stdout
        }]
    },
);

module.exports = logger;