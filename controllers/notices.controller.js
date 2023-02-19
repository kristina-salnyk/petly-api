const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const service = require("../service/notices");

const { NotFound } = require("http-errors");
const { Notices } = require("../models/notice");
const { User } = require("../models/user");

async function getNoticesByCategory(req, res, next) {
  const { category } = req.query;

  try {
    const noticesBycategory = await service.getNotices(category);

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
  // const { userId } = req.params;
  // const { _id, favorites = [] } = req.user;
  // console.log(_id);
  // console.log(favorites);
  // const index = User.indexOf(userId);
  // if (index === _id) {
  //   for (let favorit of favorites) {
  //     return favorit;
  //   }
  // }
  // console.log(1);
  // const user = await User.findById(_id, { favorites });
  // if (!user) {
  //   throw NotFound(404);
  // }

  
  // const { email, favorites } = req.user;
  // return res.status(200).json({
  //   data: {
  //     user: {
  //       email,
  //       favorites,
  //     },
  //   },
  // });

  // const { _id, favorites = [] } = req.user;
  // const unsortedNotices = await User.findById(_id, { favorites });
  // if (!unsortedNotices) {
  //   throw NotFound(404);
  // }
  // const notices = [...unsortedNotices].sort(
  //   (firstNotice, secondNotice) => new Date(secondNotice.favorit) - new Date(firstNotice.favorit)
  // );
  // res.json({ notices });
};

const addNoticeInFavorites = async (req, res) => {
  const { noticesId } = req.params;
  const { _id, favorites = [] } = req.user;

  const index = favorites.indexOf(noticesId);
  if (index === -1) {
    favorites.push(noticesId);
  }

  const user = await User.findByIdAndUpdate(_id, { favorites }, { new: true });
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
  const { filename, path: tempPath } = req.file;
  const imageName = `${_id}.${filename}`;
  const publicPath = path.join(__dirname, "../", "public", "noticesImage", filename);
  await fs.rename(tempPath, publicPath);

  Jimp.read(publicPath)
    .then(image => {
      return image.resize(250, 250).write(publicPath);
    })
    .catch(error => {
      throw error;
    });

  const imageURL = path.join("public", "noticesImage", imageName);

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
    image: imageURL,
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
