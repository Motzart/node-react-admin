"use strict";
const get = require("./get");
const post = require("./post");
const passport = require("passport");

module.exports = (router, User, Profile) => {
  router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    get(User, Profile)
  );
  router.post(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    post(User, Profile)
  );
};
