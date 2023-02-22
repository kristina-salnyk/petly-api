const { NotFound } = require("http-errors");
const { Notices } = require("../models/notice");
const { User } = require("../models/user");
const service = require("../services/notices");

const categories = ["sell", "in-good-hands", "lost-found"];

const getNoticesByCategory = async (req, res, next) => {
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

      #swagger.responses[200] = {
        description: 'Notices by category',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/noticesByCategory' },
            example: [{
                       "_id": "63f496899d811400fbd1aacc",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            },{
                "_id": "63f4969e9d811400fbd1aacf",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            },{
                "_id": "63f49f3f9d811400fbd1aad2",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
            }]
          }
        }
      }
    */

  const { category } = req.params;

  if (!categories.includes(category)) {
    return next();
  }

  try {
    const notices = await service.getNoticesByCategory(category);
    res.status(200).json(notices);
  } catch (error) {
    next(error);
  }
};

const getNoticeById = async (req, res, next) => {
  /*
  #swagger.tags = ['Notices']
  */

  const { noticeId } = req.params;

  try {
    const notice = await service.getNoticeById(noticeId);
    res.status(200).json(notice);
  } catch (error) {
    next(error);
  }
};

const getNoticesByCategoryController = async (req, res, next) => {
  const { categoryName } = req.params;
  try {
    const noticesBycategory = await service.getNoticeByCategory(categoryName);

    res.json(noticesBycategory);
  } catch (error) {
    next(error);
  }
};
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

const getNoticeByIdController = async (req, res, next) => {
  const { noticeId } = req.params;
  try {
    const notice = await service.getNoticeById(noticeId);

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

    /*
      #swagger.responses[200] = {
        description: 'Notice by id',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/noticeById' },
            example: {
                               "_id": "63f49f3f9d811400fbd1aad2",
        "category": "in-good-hands",
        "title": "Calico cat with dog personality",
        "name": "Ronie",
        "birthday": "10.09.2021",
        "breed": "Calico cat",
        "gender": "female",
        "location": "Kerry, Ireland",
        "price": "free",
        "image": "",
        "comments": "Friendy cat, can walk long distance with a master like a dog. Good fo kids. Bring you luck",
        "owner": "63f495d79d811400fbd1aac5"
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
    res.json(notice);
  } catch (error) {
    next(error);
  }
};

const addNoticeInFavorites = async (req, res) => {
  const { noticesId } = req.params;
  const { _id, favorites = [] } = req.user;

  const index = favorites.indexOf(noticesId);
  if (index === -1) {
    favorites.push(noticesId);
  }

  try {
    const user = await service.addNoticeInFavorites(noticeId, _id);

    if (!user) {
      throw NotFound(404);
    }

    res.json({
      user: { email: user.email, favorites: user.favorites },
    });
  } catch (error) {
    next(error);
  }
};

const deleteNoticeFromFavorites = async (req, res, next) => {
  const { noticeId } = req.params;
  const { favorites, _id } = req.user;

  if (!favorites.some(favorite => favorite._id.toString() === noticeId)) {
    res.status(409).json({ message: "This notice is not in favorites" });
  }

  try {
    const user = await service.deleteNoticeFromFavorites(noticeId, _id);

    if (!user) {
      throw NotFound(404);
    }

    res.json({
      user: { email: user.email, favorites: user.favorites },
    });
  } catch (error) {
    next(error);
  }
};

const getMyNotices = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const data = await service.getMyNotices(_id);

    if (!data) {
      throw NotFound(404);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const createNotice = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const data = req.file ? { image: req.file.path, ...req.body } : req.body;

    const result = await service.createNotice(data, owner);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteMyNotice = async (req, res, next) => {
  const { noticeId } = req.params;
  const { _id } = req.user;

  try {
    const result = await service.deleteMyNotice(noticeId, _id);

    if (!result) {
      throw NotFound(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNotice,
  getFavoriteNoticesController,
  getNoticesByCategoryController,
  getMyNotices,
  deleteNoticeFromFavorites,
  deleteMyNotice,
  getNoticeByIdController,
  addNoticeInFavorites,
  getNoticesByCategory,
  getNoticeById,
};
