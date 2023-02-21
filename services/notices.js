const { Notices } = require("../models/notice");

const createNotice = async ({category, title, name, birthday, breed, gender, location, price, comments, image }, owner) => {
  return await Notices.create({category, title, name, birthday, breed, gender, location, price, comments, image, owner});
};

const getNoticeById = async (id) => {
  return await Notices.findById(id);
};

module.exports = {
  createNotice,
  getNoticeById
};
