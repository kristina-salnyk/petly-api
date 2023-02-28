const service = require("../services/pets");
const { BadRequest, RequestError } = require("http-errors");

const getPets = async (req, res, next) => {
  /**  #swagger.tags = ['Pets']
#swagger.summary = 'Get user pets'
#swagger.description = 'Get user pets list'
#swagger.security = [{"JWT": []}]
#swagger.responses[200]={
description: 'List of pets',
content:{
  'application/json':{
  schema: { $ref: '#/definitions/petsList' },
  example:[ {
    "_id": "63f7c22dd0ce4a68a9a09c3c",
    "name": "petName",
    "birthday": "01.01.1990",
    "breed": "breed",
    "comments": "noComments",
    "owner": "63f3f97a70e0b66d0946a306",
    "__v": 0
  },
  {
    "_id": "63f7c531d0ce4a68a9a09c3f",
    "name": "petName1",
    "birthday": "01.01.1990",
    "breed": "breed",
    "comments": "noComments",
    "owner": "63f3f97a70e0b66d0946a306",
    "__v": 0
  }]
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
  const { _id } = req.user;

  try {
    const pets = await service.getPets(_id);

    if (!pets) {
      throw RequestError(404);
    }
    res.json(pets);
  } catch (error) {
    next(error);
  }
};

const addPet = async (req, res, next) => {
  console.log(req.body);
  /**  #swagger.tags = ['Pets']
#swagger.summary = 'Create a pet'
#swagger.description = 'Create a pet in user pet list'
#swagger.security = [{"JWT": []}]
#swagger.consumes = ['multipart/form-data']
#swagger.requestBody = {
      required: true,
      content: {
        'multipart/form-data': {
          schema: { $ref: '#/definitions/Pet' },
        }
      }
    }
     #swagger.responses[200] = { 
        description: 'Pet created successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Pet' },
            example: {
  "name": "awesomeName",
  "birthday": "01.01.2000",
  "breed": "hobo",
  "comments": "Some comments",
  "owner": "63f3f97a70e0b66d0946a306",
  "petImage": "https://res.cloudinary.com/datobb5og/image/upload/v1677242798/avatars/repdbyueunorx0ormisp.jpg",
  "_id": "63f8b1af31d1d353d546470b",
  "__v": 0
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
  const data = req.file ? { petImage: req.file.path, ...req.body } : req.body;
  try {
    const pet = await service.addPet(data, _id);

    if (!pet) {
      throw BadRequest(400, "Not found");
    }
    res.json(pet);
  } catch (error) {
    next(error);
  }
};

const removePet = async (req, res, next) => {
  /**  #swagger.tags = ['Pets']
#swagger.summary = 'Delete user pet'
#swagger.description = 'Delete user pet from pet list'
#swagger.security = [{"JWT": []}]
#swagger.responses[200]={
description: 'Deleted pet',
content:{
  'application/json':{
  schema: { $ref: '#/definitions/petsList' },
  example:{
    "message": "success"
}
  }
}
}

  #swagger.responses[404] = {
    description: 'Pet not found',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Pet not found'
            }
          }
        }
  }
*/
  const { petId } = req.params;
  if (!petId) {
    throw BadRequest(404, "Not found");
  }

  try {
    const result = await service.removePet(petId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPets,
  addPet,
  removePet,
};
