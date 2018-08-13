"use strict";
const httpStatus = require("http-status-codes");

module.exports = (User, Profile) => {
  return (req, res) => {
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          return res
            .status(httpStatus.NOT_FOUND)
            .json({ errors: "There is no profile for this user" });
        }
        res.json(profile);
      })
      .catch(err => res.status(httpStatus.NOT_FOUND).json(err));
  };
};
