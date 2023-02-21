const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const { PORT = 3000 } = process.env;

const document = {
  info: {
    title: "Pet Support API",
    description: "Pet Support project backend service",
  },
  consumes: ["application/json", "multipart/form-data"],
  produces: ["application/json"],
  servers: [
    {
      url: "https://pet-support.onrender.com",
      description: "production server",
    },
    {
      url: `http://localhost:${PORT}`,
      description: "local server",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "User authorization endpoints",
    },
    {
      name: "Users",
      description: "Users manage endpoints",
    },
    {
      name: "News",
      description: "News manage endpoints",
    },
    {
      name: "Services",
      description: "Services manage endpoints",
    },
    {
      name: "Notices",
      description: "Notices manage endpoints",
    },
    {
      name: "Pets",
      description: "Pets manage endpoints",
    },
  ],
  securityDefinitions: {
    JWT: {
      name: "Bearer Authentication",
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  components: {
    "@schemas": {
      NewUser: {
        type: "object",
        description: "User data",
        properties: {
          email: {
            type: "string",
            description: "Email address",
          },
          password: {
            type: "string",
            description: "Password",
          },
          name: {
            type: "string",
            description: "Name",
          },
          city: {
            type: "string",
            description: "City, region",
          },
          phone: {
            type: "string",
            description: "Phone number",
          },
        },
        required: ["email", "password", "name", "city", "phone"],
      },
      User: {
        type: "object",
        description: "User data",
        properties: {
          user: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique user ID",
              },
              email: {
                type: "string",
                description: "Email address",
              },
              name: {
                type: "string",
                description: "Name",
              },
            },
          },
        },
      },
      AuthorizedUser: {
        type: "object",
        description: "User data",
        properties: {
          token: {
            type: "string",
            description: "Token",
          },
          user: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique user ID",
              },
              email: {
                type: "string",
                description: "Email address",
              },
              name: {
                type: "string",
                description: "Name",
              },
            },
          },
        },
      },
      NewsList: {
        type: "array",
        description: "News",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "News id",
            },
            title: {
              type: "string",
              description: "News title",
            },
            url: {
              type: "string",
              description: "News url",
            },
            description: {
              type: "string",
              description: "News description",
            },
            date: {
              type: "string",
              description: "News date",
            },
          },
        },
      },
      noticesByCategory: {
        type: "array",
        description: "Notices",
        items: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Notice id",
            },
            category: {
              type: "string",
              description: "Notice category",
            },
            title: {
              type: "string",
              description: "Notice title",
            },
            name: {
              type: "string",
              description: "Notice name",
            },
            birthday: {
              type: "string",
              description: "Notice birthday",
            },
            breed: {
              type: "string",
              description: "Notice breed",
            },
            gender: {
              type: "string",
              description: "Notice gender",
            },
            location: {
              type: "string",
              description: "Notice location",
            },
            price: {
              type: "string",
              description: "Notice price",
            },
            image: {
              type: "string",
              description: "Notice image url",
            },
            comments: {
              type: "string",
              description: "Notice comments",
            },
            owner: {
              type: "string",
              description: "Notice owner id",
            },
          },
        },
      },
      noticeById: {
        type: "object",
        description: "Notice data",
        properties: {
          _id: {
            type: "string",
            description: "Notice id",
          },
          category: {
            type: "string",
            description: "Notice category",
          },
          title: {
            type: "string",
            description: "Notice title",
          },
          name: {
            type: "string",
            description: "Notice name",
          },
          birthday: {
            type: "string",
            description: "Notice birthday",
          },
          breed: {
            type: "string",
            description: "Notice breed",
          },
          gender: {
            type: "string",
            description: "Notice gender",
          },
          location: {
            type: "string",
            description: "Notice location",
          },
          price: {
            type: "string",
            description: "Notice price",
          },
          image: {
            type: "string",
            description: "Notice image url",
          },
          comments: {
            type: "string",
            description: "Notice comments",
          },
          owner: {
            type: "string",
            description: "Notice owner id",
          },
        },
      },
      Error: {
        type: "object",
        description: "Error detail",
        properties: {
          message: {
            type: "string",
            description: "Error message",
          },
        },
      },
    },
  },
};

const outputFile = "../swagger.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, document);
