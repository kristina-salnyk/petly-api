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
