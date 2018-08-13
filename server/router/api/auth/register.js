"use strict";
const httpStatus = require("http-status-codes");
const bcrypt = require("bcrypt");

const validateRegisterInput = require("./validator/register");

module.exports = User => {
  return (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        res.status(400).json({ email: "Email already exist" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: "avatar",
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  };
};
