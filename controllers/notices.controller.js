
const { NotFound } = require("http-errors");
const { Notices } = require("../models/notice");
const { User } = require("../models/user");

async function getNoticesByCategory(req, res, next) {
  const { category } = req.params;

  try {
    const noticesBycategory = await Notices.find({announcement: category});

    res.json(noticesBycategory);
  } catch (error) {
    next(error);
  }
}

async function getNoticeById(req, res) {
  const { noticesId } = req.params;

  const notice = await Notices.findById(noticesId);

  if (!notice) {
    throw NotFound(404);
  }

  return res.json(notice);
}

const getAllNoticeByFavorites = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id)
    .populate("favorites", { title: 1, _id: 0 })
    .select("favorites");
  if (!user) {
    throw NotFound(404);
  }
  return res.json(user.favorites);
};

const addNoticeInFavorites = async (req, res) => {
  const { noticesId } = req.params;
  const { _id, favorites = [] } = req.user;

  const index = favorites.indexOf(noticesId);
  if (index === -1) {
    favorites.push(noticesId);
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { $push: { favorites: noticesId } },
    { new: true }
  );
  if (!user) {
    throw NotFound(404);
  }

  res.json({
    user: { email: user.email, favorites: user.favorites },
  });
};

const deleteNoticeInFavorites = async (req, res) => {
  const { noticesId } = req.params;
  const { _id, favorites } = req.user;

  const index = favorites.indexOf(noticesId);

  if (index !== -1) {
    favorites.splice(index, 1);
  }

  const user = await User.findByIdAndUpdate(_id, { favorites }, { new: true });

  if (!user) {
    throw NotFound(404);
  }

  res.json({
    user: { email: user.email, favorites: user.favorites },
  });
};

const getAddedNotices = async (req, res) => {
  const { _id } = req.user;
  const result = await Notices.find({ owner: _id });
  if (!result) {
    res.status(404).json({
      code: 404,
      message: "Not found",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: result,
  });
};

const addMyNotices = async (req, res) => {
  const { _id } = req.user;
  const { announcement, title, name, birthday, breed, theSex, location, price, comments } =
    req.body;
  const { path } = req.file;

  const result = await Notices.create({
    announcement,
    title,
    name,
    birthday,
    breed,
    theSex,
    location,
    price,
    comments,
    image: path || "",
    owner: _id,
  });

  if (!result) {
    res.status(400).json({ message: "Notices is not created" });
    return;
  }

  res.status(201).json({ data: result });
};

const deleteFavoriteNotices = async (req, res) => {
  const { noticesId } = req.params;
  const result = await Notices.findByIdAndUpdate(
    { _id: noticesId, favorite: false },
    { new: true }
  );
  if (!result) {
    res.status(404).json({
      code: 404,
      message: "Notice not found",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "Favorite notice deleted",
    data: result,
  });
};

const deleteMyNotices = async (req, res) => {
  const { noticesId } = req.params;
  const { _id } = req.user;
  const result = await Notices.findOneAndDelete({ _id: noticesId, owner: _id });
  if (!result) {
    res.status(404).json({
      code: 404,
      message: "Notice not found",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "Notice deleted",
    data: result,
  });
};

module.exports = {
  getAddedNotices,
  addMyNotices,
  deleteFavoriteNotices,
  deleteMyNotices,
  getNoticesByCategory,
  getNoticeById,
  getAllNoticeByFavorites,
  addNoticeInFavorites,
  deleteNoticeInFavorites,
};
