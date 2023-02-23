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
       

*/
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const friends = await service.getServices(skip, limit);
    res.json(friends);
  } catch (error) {
    next(error);
  }
};

module.exports = { getServices };
