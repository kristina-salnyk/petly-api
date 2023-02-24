const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().min(7).max(32).required(),
  email: Joi.string().email().required(),
  name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  city: Joi.string()
    .pattern(/[A-Z][a-z]/)
    .required(),
  phone: Joi.string()
    .pattern(/^\+380\d{9}$/, "numbers")
    .required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(7).max(32).required(),
  email: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
