const { NotFound } = require("http-errors");
const { Notices } = require("../models/notice");
const { User } = require("../models/user");

async function getNoticesByCategory(req, res, next) {
  /*
  #swagger.tags = ['Notices']
  #swagger.summary = 'Get Notices by Category'
  #swagger.description = 'Get all notices by category'

  #swagger.parameters['category'] = {
    in: 'path',
    description: 'Category name',
    required: true,
    type: 'string'
  }

*/
  const { category } = req.params;

  try {
    const noticesBycategory = await Notices.find({ announcement: category });
    /*
      #swagger.responses[200] = { 
        description: 'Notices by category',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Notices' },
            example: {
                id: "63f2365f415a80342defc8ea",
    announcement: "sell",
    name: "r2d2",
    birthday: "",
    breed: "",
    location: "",
    price: "",
    image: "https://res.cloudinary.com/datobb5og/image/upload/v1676818015/vzymfd8ezu0giqzezrab.jpg",
    comments: "",
    owner: "63f230f17079f0b526f60bcf"
            }
          }
        } 
      }
    */

    res.json(noticesBycategory);
  } catch (error) {
    /*
  #swagger.responses[404] = {
    description: 'Notices not found for category',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notices not found for category'
            }
          }
        } 
  }
    */
    next(error);
  }
}

async function getNoticeById(req, res, next) {
  /*
  #swagger.tags = ['Notices']
  #swagger.summary = 'Get Notice by ID'
  #swagger.description = 'Returns a notice with the given ID'

  #swagger.parameters['noticesId'] = {
    in: 'path',
    description: 'ID of the notice to retrieve',
    required: true,
    type: 'string'
  }
*/
  try {
    const { noticesId } = req.params;

    const notice = await Notices.findById(noticesId);
    /*
      #swagger.responses[200] = { 
        description: 'Notices by category',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Notice' },
            example: {
                id: "63f2365f415a80342defc8ea",
    announcement: "sell",
    name: "r2d2",
    birthday: "",
    breed: "",
    location: "",
    price: "",
    image: "https://res.cloudinary.com/datobb5og/image/upload/v1676818015/vzymfd8ezu0giqzezrab.jpg",
    comments: "",
    owner: "63f230f17079f0b526f60bcf"
            }
          }
        } 
      }
    */

    if (!notice) {
      throw NotFound(404);
    }
    /*
  #swagger.responses[404] = {
    description: 'Notice not found',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notice not found'
            }
          }
        } 
  }
    */

    return res.json(notice);
  } catch (error) {
    next(error);
  }
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

const createNotice = async (req, res) => {
  const { _id } = req.user;
  const { category, title, name, birthday, breed, gender, location, price, comments } = req.body;
  const path = req.file?.path;
  console.log(1);
  const result = await Notices.create({
    category,
    title,
    name,
    birthday,
    breed,
    gender,
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
  createNotice,
  deleteFavoriteNotices,
  deleteMyNotices,
  getNoticesByCategory,
  getNoticeById,
  getAllNoticeByFavorites,
  addNoticeInFavorites,
  deleteNoticeInFavorites,
};
