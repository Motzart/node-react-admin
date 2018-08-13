"use strict";
const joi = require("joi");
const envVarsSchema = joi
  .object({
    DB_NAME: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PORT: joi.string().required()
  })
  .unknown()
  .required();
const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`DB Config validation Error: ${error.message}`);
}

const config = {
  db: {
    port: envVars.DB_PORT,
    name: envVars.DB_NAME,
    pass: envVars.DB_PASS,
    user: envVars.DB_USER
  }
};
module.exports = config;
