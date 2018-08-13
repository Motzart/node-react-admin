"use strict";
const config = require("./config");

// TODO Googd idea connect to bugsnag in future when first release will be done
//
// const bugsnag = require("bugsnag");
// bugsnag.register("59793568030735bd73315f45d0917c76");

console.log(`Starting Server on ${config.env} mode`);

// Connect to Monogo DB
require("./db");

// Connetct our rest api
require("./server");
