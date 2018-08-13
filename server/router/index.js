"use strict";

const router = require("express").Router();
const api = require("./api");

// Models
const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

router.get("/", api.main.get);

require("./api/users")(router, User);
require("./api/auth")(router, User);
require("./api/profile")(router, User, Profile);
require("./api/posts")(router, User, Post);

module.exports = router;
