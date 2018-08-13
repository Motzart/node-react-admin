'use strict';

const app = require('./express');
const config = require('../config');
const exitCode = 1;

app.listen(config.server.port, (err) => {
    if (err) {
        console.error('Error happened during server start', err);
        process.exit(exitCode);
    }
    console.log(`SERVER: listening on port ${config.server.port}`);
});
