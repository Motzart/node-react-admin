const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !_.isEmpty(data.email) ? data.email : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.password, { min: 4, max: 8 })) {
    errors.password = "Password must be between 4 and 8 characters";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Incorrect email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
