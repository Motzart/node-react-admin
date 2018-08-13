"use strict";
const get = require("./get");
const passport = require("passport");

module.exports = (router, User) => {
  router.get(
    "/users",
    passport.authenticate("jwt", { session: false }),
    get(User)
  );
};
