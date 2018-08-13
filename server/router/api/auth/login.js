"use strict";
const httpStatus = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const validateLoginInput = require("./validator/login");
const config = require("../../../../config");

const secret = config.jwt_secret;

module.exports = User => {
  return (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(httpStatus.BAD_REQUEST).json({ errors });
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res
            .status(httpStatus.NOT_FOUND)
            .json({ errors: { email: "User not found" } });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = _.pick(user, [
              "id",
              "name",
              "email",
              "updatedAt",
              "createdAt"
            ]);
            jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
              res.json({ token: `Bearer ${token}` });
            });
          } else {
            res.status(httpStatus.NOT_FOUND).json({
              errors: { message: "incorrect credentioal data!" }
            });
          }
        });
      })
      .catch(e => console.log(e));
  };
};
