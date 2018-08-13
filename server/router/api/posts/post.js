"use strict";
const httpStatus = require("http-status-codes");

module.exports = (User, Post) => {
  return (req, res) => {
    // Post.findOne({ user: req.user.id })
    //   .populate("user", ["name", "avatar"])
    //   .then(profile => {
    //     if (!profile) {
    //       return res.errorResponse(
    //         httpStatus.NOT_FOUND,
    //         "There is no profile for this user"
    //       );
    //     }
    //     res.jsonSuccess(profile);
    //   })
    //   .catch(err => res.errorResponse(httpStatus.NOT_FOUND, err));
  };
};
