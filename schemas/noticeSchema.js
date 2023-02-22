const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");

const Joi = JoiBase.extend(JoiDate);

const noticeSchema = Joi.object({
  category: Joi.string().required(),
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.date().format("DD.MM.YYY"),
  breed: Joi.string().min(2).max(24).required(),
  gender: Joi.string().required(),
  location: Joi.string(),
  price: Joi.number().min(1),
  image: Joi.string(),
  comments: Joi.string().min(8).max(120).required(),
  favorite: Joi.boolean(),
});

module.exports = { noticeSchema };
