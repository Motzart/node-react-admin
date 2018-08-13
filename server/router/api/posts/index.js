"use strict";
const get = require("./get");
const post = require("./post");
const passport = require("passport");

module.exports = (router, User, Post) => {
  router.get(
    "/post",
    passport.authenticate("jwt", { session: false }),
    get(User, Post)
  );
  router.post(
    "/post",
    passport.authenticate("jwt", { session: false }),
    post(User, Post)
  );
};
