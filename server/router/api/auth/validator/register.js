const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !_.isEmpty(data.name) ? data.name : "";
  data.email = !_.isEmpty(data.email) ? data.email : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";
  data.passwordRetype = !_.isEmpty(data.passwordRetype)
    ? data.passwordRetype
    : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (!Validator.isLength(data.password, { min: 4, max: 8 })) {
    errors.password = "Password must be between 4 and 8 characters";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Incorrect email";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.passwordRetype)) {
    errors.passwordRetype = "Password field is required";
  }

  if (!Validator.equals(data.password, data.passwordRetype)) {
    errors.passwordRetype = "Passwords must match";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
