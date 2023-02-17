const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().max(32).required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = registerSchema;
