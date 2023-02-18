const Joi = require("joi").extend(require("@joi/date"));

const petSchema = Joi.object({
  name: Joi.string(),
  birthday: Joi.date(),
  breed: Joi.string(),
  comments: Joi.string().max(120),
});

module.exports = { petSchema };
