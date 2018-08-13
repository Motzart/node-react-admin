"use strict";
const moment = require("moment");

module.exports = function(req, res) {
  res.json([
    {
      appName: "REST API",
      serverTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
      currentVersion: "v1",
      serverStatus: "ok"
    }
  ]);
};
