const { Notices } = require("../models/notice");
const {User} = require("../models/user");

const createNotice = async ({category, title, name, birthday, breed, gender, location, price, comments, image }, owner) => {
  return await Notices.create({category, title, name, birthday, breed, gender, location, price, comments, image, owner});
};

const getNoticeById = async (id) => {
  return await Notices.findById(id);
};

const getNoticeByCategory = async (category) => {
  return await Notices.find({ category })

};

const getFavoriteNotices = async (_id) => {
  const user = await User.findById(_id)
    .populate("favorites", { _id: 0 })
    .select("favorites");
  return user.favorites;
}

module.exports = {
  createNotice,
  getNoticeById,
  getNoticeByCategory,
  getFavoriteNotices
};
