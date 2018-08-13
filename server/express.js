"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = require("./router");
const _ = require("lodash");
const cors = require("cors");
const httpStatus = require("http-status-codes");
const helmet = require("helmet");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const fs = require("fs");

// create a write stream for our logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  { flags: "a" }
);

// Modify if we wont change response format

//express.response.jsonSuccess = function(data) {
// if (!_.isArray(data)) {
//   console.error("ERROR: Response data must be string!");
//   return this.json({
//     data: null,
//     errors: {
//       status: httpStatus.INTERNAL_SERVER_ERROR,
//       message: .getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
//     }
//   });
// }
//};

// Modify if we wont change error response format

// express.response.errorResponse = function(status, e) {
//   if (_.isString(e) || _.isObject(e)) {
//     console.error("RESPONSE ERROR:", e);
//     e = {
//       message: e
//     };
//   }

//   this.status(status).send({
//     data: null,
//     errors: {
//       status,
//       message: e.message
//     }
//   });
// };

app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(jsonParser);
app.use("*", cors());

app.use(morgan(":method :url Status::status Res_time::response-time ms"));

// Initialize passport
app.use(passport.initialize());
require("../services/passport")(passport);

// Setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1", router);
app.use("*", (req, res) => {
  res
    .status(httpStatus.NOT_FOUND)
    .json({ errors: httpStatus.getStatusText(httpStatus.NOT_FOUND) });
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", err => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

module.exports = app;
