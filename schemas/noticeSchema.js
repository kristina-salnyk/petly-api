const Joi = require("joi").extend(require("@joi/date"));


const noticeSchema = Joi.object({
  category: Joi.string().valid("sell", "lost-found", "in-good-hands").required(),
  title: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(2)
    .max(48)
    .required(),
  name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(2)
    .max(16),
  birthday: Joi.date().format("DD.MM.YYYY").less("now"),
  breed: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(2)
    .max(24),
  gender: Joi.string().required(),
  location: Joi.string()
    .pattern(/[A-Z][a-z]*/)
    .required(),
  price: Joi.number().min(0.01).required(),
  image: Joi.string(),
  comments: Joi.string().min(8).max(120).required(),
  favorite: Joi.boolean(),
});

module.exports = { noticeSchema };
