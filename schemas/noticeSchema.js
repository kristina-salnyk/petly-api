const Joi = require("joi");

const noticeSchema = Joi.object({
  category: Joi.string().required(),
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.date().less("now"),
  breed: Joi.string().min(2).max(24).required(),
  gender: Joi.string().required(),
  location: Joi.string(),
  price: Joi.number().min(1).required(),
  image: Joi.string(),
  comments: Joi.string().min(8).max(120).required(),
  favorite: Joi.boolean(),
});

module.exports = { noticeSchema };
