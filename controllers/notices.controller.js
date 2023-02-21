const {noticesCategories} = require("../constants/NoticesCategories");
const { NotFound } = require("http-errors");
const { Notices } = require("../models/notice");
const { User } = require("../models/user");
const {createNotice, getNoticeById, getNoticeByCategory, getFavoriteNotices} = require("../services/notices");
async function getNoticesByParameter(req, res, next) {
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
  const { parameter } = req.params;
  try {

    if (noticesCategories.includes(parameter)) { 
      const noticesBycategory = await getNoticeByCategory(parameter)
   
      /*
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

      res.json(noticesBycategory);
    } 
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

    else {
      const notice = await getNoticeById(parameter);

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
      res.json(notice)}
  } catch (error) {
    next(error)
  }};

const getFavoriteNoticesController = async (req, res, next) => {
  const { _id } = req.user;

  const favorites = await getFavoriteNotices(_id);
  if (!favorites) {
    throw NotFound(favorites);
  }
  res.json(favorites);
}
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

const createNoticeController = async (req, res) => {
  const owner = req.user._id
  const data = req.file ? {image: req.file.path, ...req.body } : req.body;
  const result = await createNotice(data, owner);
  
  res.status(201).json(result);
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
  getFavoriteNoticesController,
  getAddedNotices,
  createNoticeController,
  deleteFavoriteNotices,
  deleteMyNotices,
  getNoticesByParameter,
  addNoticeInFavorites,
  deleteNoticeInFavorites
};