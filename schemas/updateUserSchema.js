const Joi = require("joi");

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  birthday: Joi.date(),
  phone: Joi.string().pattern(/^\+380\d{9}$/, "numbers"),
  city: Joi.string().pattern(/[A-Z][a-z]*/),
});

module.exports = { updateUserSchema };
