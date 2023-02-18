const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { Notices } = require("../models/notice");

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
};
