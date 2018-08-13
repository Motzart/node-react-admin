'use strict';
require('dotenv').config();

const logger = require('./logger');
const server = require('./server');
const db = require('./db')

module.exports = Object.assign({}, logger, server, db);
