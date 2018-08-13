"use strict";
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const Schema = mongoose.Schema;
//const ObjectId = mongoose.Schema.ObjectId;

let UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, index: true },
    password: { type: String, index: true },
    avatar: { type: String, index: true }
  },
  { collection: "users" }
);

UserSchema.plugin(timestamps);

module.exports = mongoose.model("users", UserSchema);
