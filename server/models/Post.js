"use strict";
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    text: {
      type: String,
      required: true
    },
    name: { type: String },
    avatar: { type: String },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users"
        }
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users"
        },
        text: {
          type: String,
          required: true
        },
        name: { type: String },
        date: { type: Date, default: Date.now }
      }
    ]
  },
  { collection: "post" }
);

PostSchema.plugin(timestamps);

module.exports = mongoose.model("post", PostSchema);
