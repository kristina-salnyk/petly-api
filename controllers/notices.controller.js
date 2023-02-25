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
            schema: { $ref: '#/definitions/noticesList' },
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
            }]
          }
        }
      }
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

  const { category } = req.params;
  const { user } = req;
  const favorites = user?.favorites || [];

  if (!categories.includes(category)) {
    return next();
  }

  try {
    const notices = await service.getNoticesByCategory(category);

    const result = notices.map(item => {
      const obj = item.toObject();
      return { ...obj, favorite: favorites.includes(obj._id) };
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getNoticeById = async (req, res, next) => {
  /*
  #swagger.tags = ['Notices']
  #swagger.summary = 'Get Notice by ID'
  #swagger.description = 'Returns a notice with the given ID'
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
  const { noticeId } = req.params;
  const { user } = req;
  const favorites = user?.favorites || [];

  try {
    const notice = await service.getNoticeById(noticeId);

    if (!notice) {
      throw NotFound(404);
    }

    const result = { ...notice, favorite: favorites.includes(notice._id) };

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getFavoriteNotices = async (req, res, next) => {
  /*
#swagger.tags = ['Notices']
#swagger.summary = 'Get favorite notices'
#swagger.description = 'Get favorite notices of a user'
#swagger.security = [{"JWT": []}]
#swagger.responses[200] = { 
        description: 'User favorites notices list.',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/noticesList' },
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
            }]
          }
        } 
      }
#swagger.responses[404] = {
    description: 'Notices not found in favorite',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notices not found in favorite'
            }
          }
        }
  }
*/
  const { _id } = req.user;

  try {
    const favorites = await service.getFavoriteNotices(_id);

    if (!favorites) {
      throw NotFound(favorites);
    }

    const result = favorites.map(item => {
      const obj = item.toObject();
      return { ...obj, favorite: true };
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addNoticeInFavorites = async (req, res, next) => {
  /*
#swagger.tags = ['Notices']
#swagger.summary = 'Add notice to user favorites'
#swagger.description = 'Add the notice with the given ID to the user favorites list.'
#swagger.security = [{"JWT": []}]
#swagger.responses[200] = {
  description: 'User favorites with the newly added notice.',
  schema: {
    $ref: '#/definitions/addFavoriteNotice'
  },
  example: {
  "user": {
    "email": "user.email@mail.com",
    "favorites": [
      "63f4ae01b692bc63eb7c2d48",
      "63f5238cb8c2f29e47d1bdb5",
      "63f5fc0baf1b6464dbc75f14",
      "63f5238cb8c2f29e47d1bdb5"
    ]
  }
}
}
#swagger.responses[409] = {
    description: 'Notice already in notices list',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notice already in notices list'
            }
          }
        }
  }
*/
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
  /**  #swagger.tags = ['Notices']
#swagger.summary = 'Delete a notice'
#swagger.description = 'Delete a notice with the given ID.'
#swagger.security = [{"JWT": []}]
#swagger.responses[200] = {
  description: 'Notice success deleted',
  schema: {
    $ref: '#/definitions/addFavoriteNotice'
  },
  example: {
  "user": {
    "email": "user.email@mail.com",
    "favorites": [
      "63f4ae01b692bc63eb7c2d48",
      "63f5238cb8c2f29e47d1bdb5",
      "63f5fc0baf1b6464dbc75f14",
      "63f5238cb8c2f29e47d1bdb5"
    ]
  }
}
} 
  #swagger.responses[409] = {
    description: 'This notice is not in favorites',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'This notice is not in favorites'
            }
          }
        }
  }
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
  /**  #swagger.tags = ['Notices']
#swagger.summary = 'Get all user notices'
#swagger.description = 'Return all notices created by user'
#swagger.security = [{"JWT": []}]
#swagger.responses[200] = {
        description: 'all user notices',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/noticesList' },
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
            }]
          }
        }
      }
  #swagger.responses[404] = {
    description: 'Notices not found',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Notices not found'
            }
          }
        }
  }

*/

  const { _id, favorites = [] } = req.user;

  try {
    const data = await service.getMyNotices(_id);

    if (!data) {
      throw NotFound(404);
    }

    const result = data.map(item => {
      const obj = item.toObject();
      return { ...obj, favorite: favorites.includes(obj._id) };
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createNotice = async (req, res, next) => {
  const owner = req.user._id;
  const data = req.file ? { image: req.file.path, ...req.body } : req.body;
  console.log("Req.body in add notice", req.body);
  /**  #swagger.tags = ['Notices']
#swagger.summary = 'Create a notice'
#swagger.description = 'Create a notice '
#swagger.security = [{"JWT": []}]
#swagger.consumes = ['multipart/form-data']
#swagger.requestBody = {
      required: true,
      content: {
        'multipart/form-data': {
          schema: { $ref: '#/definitions/Notice' },
        }
      }
    }
     #swagger.responses[201] = { 
        description: 'Notice created successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Notice' },
            example: {
  "category": "in-good-hands",
  "title": "title",
  "name": "awesomeName",
  "birthday": "01.01.2000",
  "breed": "breed",
  "gender": "bender",
  "location": "Location",
  "price": "1",
  "image": "https://res.cloudinary.com/datobb5og/image/upload/v1677241526/avatars/zsbsnyquqosxddfnfxbl.jpg",
  "comments": "some comments",
  "owner": "63f3f97a70e0b66d0946a306",
  "_id": "63f8acb731d1d353d54646fc"
}
          }
        } 
      }
      #swagger.responses[400] = {
    description: 'Bad Request',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Bad Request'
            }
          }
        }
  }
*/
  try {
    const result = await service.createNotice(data, owner);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteMyNotice = async (req, res, next) => {
  /**  #swagger.tags = ['Notices']
#swagger.summary = 'Delete a notice'
#swagger.description = 'Delete a notice with the given ID.'
#swagger.parameters['noticeId'] = { description: 'The ID of the notice to delete.', in: 'path', required: true, type: 'string' }
#swagger.security = [{"JWT": []}]
 #swagger.responses[200] = {
        description: 'Deleted notice by ID',
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
  getFavoriteNotices,
  createNotice,
  getMyNotices,
  deleteNoticeFromFavorites,
  deleteMyNotice,
  addNoticeInFavorites,
  getNoticesByCategory,
  getNoticeById,
};
