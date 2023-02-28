const service = require("../services/users");
const { NotFound } = require("http-errors");

const updateUser = async (req, res, next) => {
  /**  #swagger.tags = ['Users']
#swagger.summary = 'Update user'
#swagger.description = 'Update user info'
#swagger.security = [{"JWT": []}]
#swagger.consumes = ['multipart/form-data']
#swagger.requestBody = {
      required: true,
      content: {
        'multipart/form-data': {
          schema: { $ref: '#/definitions/UpdateUserInfo' },
        }
      }
    }
     #swagger.responses[200] = { 
        description: 'User info updated successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/UpdateUserInfo' },
            example: {
  "_id": "63f3f97a70e0b66d0946a306",
  "name": "userName",
  "password": "$2b$10$KWIFWBtrmtr0LzUHdienQerLvjLjoc8wUw6nEgI0c0ssOk2rrBSpG",
  "email": "user@gmail.com",
  "city": "qweqwe",
  "phone": "880005553535",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjNmOTdhNzBlMGI2NmQwOTQ2YTMwNiIsImlhdCI6MTY3NzI0NTc0MywiZXhwIjoxNjc3MjQ5MzQzfQ.sCSOdq7reEHQA9vvsLguEY0H1246F-wCq75DlN4NVlU",
  "favorites": [
    "63f4ae01b692bc63eb7c2d48",
    "63f5238cb8c2f29e47d1bdb5",
    "63f5238cb8c2f29e47d1bdb5"
  ],
  "userPets": [],
  "verificationToken": null,
  "verify": true,
  "createdAt": "2023-02-20T22:51:38.667Z",
  "updatedAt": "2023-02-24T13:35:43.618Z"
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
              message: "Not found"
            }
          }
        }
  }
*/
  const { _id } = req.user;
  const data = req.file ? { avatarURL: req.file.path, ...req.body } : req.body;

  if (!_id) {
    throw NotFound(404, "Not found");
  }

  try {
    const result = await service.updateUser(_id, data, {
      new: true,
    });

    if (!result) {
      throw NotFound(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getCurrentUserInfo = async (req, res, next) => {
  /**  #swagger.tags = ['Users']
#swagger.summary = 'Get user info'
#swagger.description = 'Get current user info'
#swagger.security = [{"JWT": []}]
#swagger.responses[200]={
description: 'User info',
content:{
  'application/json':{
  schema: { $ref: '#/definitions/UserInfo' },
  example:	
{
  "_id": "63f3f97a70e0b66d0946a306",
  "name": "userName",
  "password": "$2b$10$KWIFWBtrmtr0LzUHdienQerLvjLjoc8wUw6nEgI0c0ssOk2rrBSpG",
  "email": "user@gmail.com",
  "city": "qweqwe",
  "phone": "880005553535",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjNmOTdhNzBlMGI2NmQwOTQ2YTMwNiIsImlhdCI6MTY3NzI0NTc0MywiZXhwIjoxNjc3MjQ5MzQzfQ.sCSOdq7reEHQA9vvsLguEY0H1246F-wCq75DlN4NVlU",
  "favorites": [
    "63f4ae01b692bc63eb7c2d48",
    "63f5238cb8c2f29e47d1bdb5",
    "63f5238cb8c2f29e47d1bdb5"
  ],
  "userPets": [],
  "verificationToken": null,
  "verify": true,
  "createdAt": "2023-02-20T22:51:38.667Z",
  "updatedAt": "2023-02-24T13:35:43.618Z"
}
  }
}
}

  #swagger.responses[401] = {
    description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Unauthorized'
            }
          }
        }
  }
*/
  const { _id } = req.user;

  try {
    const result = await service.getCurrentUserInfo(_id);
    res.json({
      name: result.name,
      email: result.email,
      phone: result.phone,
      city: result.city,
      birthday: result.birthday,
      _id: result._id,
      avatarURL: result.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser, getCurrentUserInfo };
