const service = require("../services/services");

const getServices = async (req, res, next) => {
  /* 
   #swagger.tags = ['Services']
   #swagger.summary = 'Get Services'
    #swagger.description = 'Get a list of services'

  #swagger.parameters['page'] = {
    in: 'query',
    description: 'Page number to get news. Default is 1.',
    required: false,
    type: 'integer',
    minimum: 1
  }
  #swagger.parameters['limit'] = {
    in: 'query',
    description: 'Maximum number of news per page. Default is 9.',
    required: false,
    type: 'integer',
    minimum: 1,
    maximum: 100
  }
   #swagger.responses[200] = { 
        description: 'List of services',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/servicesList' },
            example:[
  {
    "workDays": [],
    "_id": "63ee67812e510dcbab7fbf37",
    "title": "Whiskas",
    "url": "https://www.whiskas.ua/",
    "addressUrl": null,
    "imageUrl": "https://storage.googleapis.com/kidslikev2_bucket/pets-support/images/sponsors/frame_285.png",
    "address": null,
    "phone": 380800500155,
    "email": null
  },
  {
    "_id": "63ee67812e510dcbab7fbf2f",
    "title": "Притулок для бездомних тварин 'Сіріус'",
    "url": "https://dogcat.com.ua",
    "addressUrl": "https://goo.gl/maps/iq8NXEUf31EAQCzc6",
    "imageUrl": "https://storage.googleapis.com/kidslikev2_bucket/pets-support/images/sponsors/frame_287.png",
    "address": "Fedorivka, Kyiv Oblast, Ukraine, 07372",
    "workDays": [
      {
        "isOpen": false
      },
      {
        "isOpen": false
      },
      {
        "isOpen": false
      },
      {
        "isOpen": false
      },
      {
        "isOpen": false
      },
      {
        "isOpen": true,
        "from": "11:00",
        "to": "16:00"
      },
      {
        "isOpen": true,
        "from": "11:00",
        "to": "16:00"
      }
    ],
    "phone": 380931934069,
    "email": null
  }]
          }
        } 
      }
      #swagger.responses[404] = {
        description: 'Services not found',
        content: {
           'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Services not found'
            }
          }
        }
  }
       

*/
  const { page, limit } = req.query;

  try {
    const friends = await service.getServices(page, limit);
    res.json(friends);
  } catch (error) {
    next(error);
  }
};

module.exports = { getServices };
