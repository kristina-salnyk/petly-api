const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});
console.log(cloudinary.config());

const { Pets } = require("../models/pet");

const getAddedPets = async (req, res, next) => {
  const { _id } = req.user;
  const result = await Pets.find({ owner: _id });
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

const addMyPets = async (req, res, next) => {
  const body = req.body;
  const { path } = req.file;
  console.log(req.file);
  const { _id } = req.user;

  const storedImage = await cloudinary.uploader.upload(path, {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  });
  console.log(storedImage);
  if (!storedImage) {
    res.status(500).json({ message: "image not saved" });
    return;
  }
  const result = await Pets.create({ body, owner: _id });
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

const deleteFavoritePets = async (req, res, next) => {
  const { noticesId } = req.params;
  const result = await Pets.findByIdAndUpdate(noticesId, { owner: null });
  if (!result) {
    res.status(404).json({
      code: 404,
      message: "Not found",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "pets notices deleted",
    data: {
      result,
    },
  });
};

const deleteMyPets = async (req, res, next) => {
  const { noticesId } = req.params;
  const { _id } = req.user;
  const result = await Pets.findOneAndDelete(noticesId, { owner: _id });
  if (!result) {
    res.status(404).json({
      code: 404,
      message: "Not found",
    });
    return;
  }
  res.status(200).json({
    code: 200,
    message: "pets deleted",
    data: {
      result,
    },
  });
};

module.exports = {
  getAddedPets,
  addMyPets,
  deleteFavoritePets,
  deleteMyPets,
};
