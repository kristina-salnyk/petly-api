const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const { PORT = 8080 } = process.env;

const document = {
  info: {
    title: "Petly API",
    description: "Petly project backend service",
  },
  consumes: ["application/json", "multipart/form-data"],
  produces: ["application/json"],
  servers: [
    {
      url: "https://petly-4cyh.onrender.com",
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
      noticesList: {
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
      userOwnNoticeList: {
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

            birthday: {
              type: "string",
              description: "Notice birthday",
            },
            breed: {
              type: "string",
              description: "Notice breed",
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
      addFavoriteNotice: {
        type: "object",
        description: "User favorite notices data",
        properties: {
          user: {
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "User email",
                example: "user.mail@mail.com",
              },
              favorites: {
                type: "array",
                items: {
                  type: "string",
                  description: "ID of the favorite notice",
                  example: "63f4ae01b692bc63eb7c2d48",
                },
              },
            },
          },
        },
      },
      servicesList: {
        type: "array",
        description: "Services",
        items: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Service id",
            },

            title: {
              type: "string",
              description: "Service title",
            },
            url: {
              type: "string",
              description: "Service url",
            },
            addressUrl: {
              type: "string",
              description: "Service addressUrl",
            },
            imageUrl: {
              type: "string",
              description: "Service imageUrl",
            },
            address: {
              type: "string",
              description: "Service address",
            },
            phone: {
              type: "string",
              description: "Service phone",
            },
            email: {
              type: "string",
              description: "Service email",
            },
            workDays: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  isOpen: {
                    type: "string",
                  },
                  from: {
                    type: "string",
                  },
                  to: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      petsList: {
        type: "array",
        description: "Pets",
        items: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Pet id",
            },

            name: {
              type: "string",
              description: "Pet name",
            },
            birthday: {
              type: "string",
              description: "Pet birthday",
            },
            breed: {
              type: "string",
              description: "Pet breed",
            },
            comments: {
              type: "string",
              description: "Pet comments",
            },
            owner: {
              type: "string",
              description: "Pet owner",
            },
            __v: {
              type: "number",
              description: "",
            },
          },
        },
      },
      Notice: {
        type: "object",
        description: "Notice data",
        properties: {
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
            type: "file",
            description: "Notice image",
          },
          comments: {
            type: "string",
            description: "Notice comments",
          },
        },
        required: ["category", "title", "name", "gender", "location"],
      },
      Pet: {
        type: "object",
        description: "Pet data",
        properties: {
          name: {
            type: "string",
            description: "Pet name",
          },
          birthday: {
            type: "string",
            description: "Pet birthday",
          },
          breed: {
            type: "string",
            description: "Pet breed",
          },
          comments: {
            type: "string",
            description: "comments",
          },
          petImage: {
            type: "file",
            description: "Pet image",
          },
        },
      },
      UserInfo: {
        type: "object",
        description: "UserInfo data",
        properties: {
          _id: {
            type: "string",
            description: "UserInfo id",
          },
          name: {
            type: "string",
            description: "UserInfo name",
          },
          password: {
            type: "string",
            description: "UserInfo password",
          },
          email: {
            type: "string",
            description: "UserInfo email",
          },
          city: {
            type: "string",
            description: "UserInfo city",
          },
          phone: {
            type: "string",
            description: "UserInfo phone",
          },
          token: {
            type: "string",
            description: "UserInfo token",
          },
          favorites: {
            type: "array",
            items: {
              type: "string",
              description: "ID of the favorite notice",
              example: "63f4ae01b692bc63eb7c2d48",
            },
          },
          userPets: {
            type: "array",
            description: "UserInfo token",
          },
          verificationToken: {
            type: "boolean",
            description: "UserInfo verificationToken",
          },
          verify: {
            type: "boolean",
            description: "UserInfo verify",
          },
          createdAt: {
            type: "string",
            description: "UserInfo createdAt",
          },
          updatedAt: {
            type: "string",
            description: "UserInfo updatedAt",
          },
        },
      },
      UpdateUserInfo: {
        type: "object",
        description: "UpdateUserInfo data",
        properties: {
          name: {
            type: "string",
            description: "UpdateUserInfo name",
          },
          email: {
            type: "string",
            description: "UpdateUserInfo email",
          },
          birthday: {
            type: "string",
            description: "UpdateUserInfo birthday",
          },
          phone: {
            type: "string",
            description: "UpdateUserInfo phone",
          },
          city: {
            type: "string",
            description: "UpdateUserInfo city",
          },
          avatarURL: {
            type: "file",
            description: "UpdateUserInfo avatar",
          },
        },
      },
      RefreshUserInfo: {
        type: "object",
        description: "UpdateUserInfo data",
        properties: {
          token: {
            type: "string",
            description: "RefreshUserInfo token",
          },
          user: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                description: "RefreshUserInfo _id",
              },
              name: {
                type: "string",
                description: "RefreshUserInfo name",
              },
              email: {
                type: "string",
                description: "RefreshUserInfo email",
              },
              phone: {
                type: "string",
                description: "RefreshUserInfo phone",
              },
              city: {
                type: "file",
                description: "RefreshUserInfo city",
              },
              avatarURL: {
                type: "file",
                description: "RefreshUserInfo avatarURL",
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
