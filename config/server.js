"use strict";
const joi = require("joi");
const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .allow(["development", "production", "test"])
      .required(),
    SERVER_PORT: joi.number().required(),
    SERVER_URL: joi.string().required(),
    JWT_SECRET: joi.string().required()
  })
  .unknown()
  .required();
const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Server Config validation Error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  isDevelopment: envVars.NODE_ENV === "development",
  jwt_secret: envVars.JWT_SECRET,
  server: {
    url: envVars.SERVER_URL,
    port: envVars.SERVER_PORT
  }
};
module.exports = config;
