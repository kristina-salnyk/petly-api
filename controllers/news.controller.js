const { getNewses } = require("../services/news");

const getNewsController = async (req, res, next) => {
  const { page, limit } = req.query;
  /* 
   #swagger.tags = ['News']
    #swagger.summary = 'Get News'
    #swagger.description = 'Get a list of news'

  #swagger.parameters['page'] = {
    in: 'query',
    description: 'Page number to get news. Default is 1.',
    required: false,
    type: 'integer',
    minimum: 1
  }

  #swagger.parameters['limit'] = {
    in: 'query',
    description: 'Maximum number of news per page. Default is 6.',
    required: false,
    type: 'integer',
    minimum: 1,
    maximum: 100
  }

*/

  try {
    const news = await getNewses(page, limit);
    /*
      #swagger.responses[200] = { 
        description: 'List of news',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/News' },
            example: {
            id: '615ec59c5bafc50b9a0c3f96',
            title: 'Example News Article 1',
            url: 'https://example.com/news/article1',
            description: 'This is an example news article.',
            date: '2021-10-07T00:00:00.000Z'
            }
          }
        } 
      }
    */
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

module.exports = { getNewsController };
