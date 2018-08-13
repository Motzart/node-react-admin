"use strict";
const httpStatus = require("http-status-codes");

module.exports = (User, Profile) => {
  return (req, res) => {
    // TODO add validation for all fields
    const profileFields = {};
    profileFields.user = req.user.id;

    Object.assign(profileFields, req.body);

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            res
              .status(httpStatus.BAD_REQUEST)
              .json(httpStatus.getStatusText.BAD_REQUEST);
          }
        });
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  };
};
