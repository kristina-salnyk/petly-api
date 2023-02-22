const { NotFound } = require("http-errors");
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
    res.json(notices);
  } catch (error) {
    next(error);
  }
};

/*
  #swagger.tags = ['Notices']
  */

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

const getNoticeById = async (req, res, next) => {
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

const getFavoriteNotices = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const favorites = await service.getFavoriteNotices(_id);
    if (!favorites) {
      throw NotFound(favorites);
    }
    res.json(favorites);
  } catch (error) {
    next(error);
  }
};

const addNoticeInFavorites = async (req, res, next) => {
  const { noticeId } = req.params;
  const { _id, favorites } = req.user;

  if (favorites.some(favorite => favorite._id.toString() === noticeId)) {
    res.status(409).json({ message: "This notice is already in favorites" });
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

const getMyNotices = async (req, res) => {
  const { _id } = req.user;

  const data = await service.getMyNotices(_id);

  if (!data) {
    throw NotFound(404);
  }
  res.json(data);
};

const createNotice = async (req, res) => {
  const owner = req.user._id;
  const data = req.file ? { image: req.file.path, ...req.body } : req.body;

  const result = await service.createNotice(data, owner);

  res.status(201).json(result);
};

const deleteMyNotice = async (req, res) => {
  const { noticeId } = req.params;
  const { _id } = req.user;

  const result = await service.deleteMyNotice(noticeId, _id);

  if (!result) {
    throw NotFound(404);
  }
  res.json(result);
};

module.exports = {
  getFavoriteNotices,
  getMyNotices,
  createNotice,
  deleteNoticeFromFavorites,
  deleteMyNotice,
  addNoticeInFavorites,
  getNoticesByCategory,
  getNoticeById,
};
