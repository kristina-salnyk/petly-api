const { Notices } = require("../models/notice");
const { User } = require("../models/user");

const createNotice = async (
  { category, title, name, birthday, breed, gender, location, price, comments, image },
  owner
) => {
  return await Notices.create({
    category,
    title,
    name,
    birthday,
    breed,
    gender,
    location,
    price,
    comments,
    image,
    owner,
  });
};

const getNoticeById = async id => {
  const {
    _id,
    category,
    title,
    name,
    birthday,
    breed,
    gender,
    location,
    price,
    comments,
    image,
    owner: { phone, email },
  } = await Notices.findById(id).populate("owner", { phone: 1, email: 1 });

  return {
    _id,
    category,
    title,
    name,
    birthday,
    breed,
    gender,
    location,
    price,
    comments,
    image,
    phone,
    email,
  };
};

const getNoticesByCategory = async category => {
  return await Notices.find({ category });
};

const getFavoriteNotices = async _id => {
  const user = await User.findById(_id).populate("favorites");
  return user.favorites;
};

const addNoticeInFavorites = async (noticeId, _id) => {
  return await User.findByIdAndUpdate(_id, { $push: { favorites: noticeId } }, { new: true });
};

const deleteNoticeFromFavorites = async (noticeId, _id) => {
  return await User.findByIdAndUpdate(
    _id,
    { $pull: { favorites: { $in: [noticeId] } } },
    { new: true }
  );
};

const getMyNotices = async owner => {
  return await Notices.find({ owner });
};

const deleteMyNotice = async (noticeId, owner) => {
  return await Notices.findOneAndDelete({ _id: noticeId, owner });
};

module.exports = {
  createNotice,
  getNoticeById,
  getNoticesByCategory,
  getFavoriteNotices,
  addNoticeInFavorites,
  deleteNoticeFromFavorites,
  getMyNotices,
  deleteMyNotice,
};
