"use strict";
const register = require("./register");
const login = require("./login");
//const logout = require("./logout");

module.exports = (router, User) => {
  router.post("/register", register(User));
  router.post("/login", login(User));
};
