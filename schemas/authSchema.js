const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().max(32).required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(7).max(32).required(),
  email: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
