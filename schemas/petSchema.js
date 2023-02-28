const Joi = require("joi").extend(require("@joi/date"));

const petSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z]*$/)
    .min(2)
    .max(16),
  birthday: Joi.date().format("YYYY-MM-DD"),
  breed: Joi.string()
    .pattern(/^[a-zA-Z\s]*$/)
    .min(2)
    .max(16),
  petImage: Joi.string(),
  comments: Joi.string().min(8).max(120).required(),
});

module.exports = { petSchema };
