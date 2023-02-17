const cloudinary = require("cloudinary");

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});
console.log(cloudinary.config());

const { Notices } = require("../models/pet");
const getDataUri = require("../helpers/dataUri");

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
    data: {
      result,
    },
  });
};

const addMyNotices = async (req, res) => {
  const body = req.body;
  const file = req.file;
  const { _id } = req.user;

  // console.log(req.file);

  const fileUri = getDataUri(file);

  const storedImage = await cloudinary.v2.uploader.upload(fileUri.content, {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  });

  if (!storedImage) {
    res.status(500).json({ message: "image not saved" });
    return;
  }
  const result = await Notices.create({
    body,
    image: { id: storedImage.public_id, uri: storedImage.secure_url },
    owner: _id,
  });
  if (!result) {
    res.status(400).json({ code: 400, message: "missing required name field" });
    return;
  }
  res.status(201).json({
    code: 201,
    message: "success",
    data: {
      result,
    },
  });
};

const deleteFavoriteNotices = async (req, res) => {
  const { noticesId } = req.params;
  const result = await Notices.findByIdAndUpdate(noticesId, { owner: null });
  if (!result) {
    res.status(404).json({
      code: 404,
      message: "Not found",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "Favorite notices deleted",
    data: {
      result,
    },
  });
};

const deleteMyNotices = async (req, res) => {
  const { noticesId } = req.params;
  const { _id } = req.user;
  const result = await Notices.findOneAndDelete(noticesId, { owner: _id });
  if (!result) {
    res.status(404).json({
      code: 404,
      message: "Not found",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "Notices deleted",
    data: {
      result,
    },
  });
};

module.exports = {
  getAddedNotices,
  addMyNotices,
  deleteFavoriteNotices,
  deleteMyNotices,
};
