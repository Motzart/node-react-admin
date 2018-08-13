'use strict';

const joi = require('joi');

const envVarsSchema = joi.object({
    LOGGER_LEVEL: joi.string()
        .allow(['error', 'warn', 'info', 'varbose', 'debug', 'silly'])
        .default('info'),
    LOGGER_ENABLED: joi.boolean()
        .truthy('TRUE')
        .truthy('true')
        .truthy('FALSE')
        .truthy('false')
}).unknown()
    .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Logger Config validation Error: ${error.message}`);
}

const config = {
    logger: {
        level: envVars.LOGGER_LEVEL,
        enabled: envVars.LOGGER_ENABLED
    }
};

module.exports = config;
