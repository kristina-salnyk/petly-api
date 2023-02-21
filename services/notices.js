const { Notices } = require("../models/notice");

const createNotice = async ({category, title, name, birthday, breed, gender, location, price, comments, image }, owner) => {

  return await Notices.create({category, title, name, birthday, breed, gender, location, price, comments, image, owner});
};

module.exports = {
  createNotice,
};
