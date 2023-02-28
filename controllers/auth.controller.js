const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { Conflict, Unauthorized, BadRequest } = require("http-errors");
const { User } = require("../models/user");
const service = require("../services/users");
const { sentVerifyURL } = require("../services/verification");

const { JWT_SECRET, BASE_URI } = process.env;

const register = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Registration'
    #swagger.description = 'Creates a new user'

    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/definitions/NewUser' },
          example: { 
            email: "Jhon.Doe@example.com",
            password: "password_example",
            name: "Jhon Doe",
            city: "Limburg, Netherlands",
            phone: "+31-77-2065000",
          }
        }
      }
    }
  */
  const { email, password, name, city, phone } = req.body;

  try {
    const user = await service.getUserByEmail(email);
    /*
      #swagger.responses[409] = { 
        description: 'Email in use',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Email in use'
            }
          }
        } 
      }
    */
    if (user) {
      throw Conflict("Email has already been registered");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = uuidv4();

    const result = await User.create({
      email,
      password: hashedPassword,
      name,
      city,
      phone,
      verificationToken,
    });

    const verifyURL = `${BASE_URI}/verify/${verificationToken}`;

    await sentVerifyURL(email, verifyURL);

    /*
      #swagger.responses[201] = { 
        description: 'User registered successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/User' },
            example: {
              user: {
                id: '63ef667fc42e9578d819c035',
                email: 'Jhon.Doe@example.com',
                name: 'Jhon Doe'
              }
            }
          }
        } 
      }
    */
    res.status(201).json({
      user: {
        id: result._id,
        email: result.email,
        name: result.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login'
    #swagger.description = 'Authorizes the user'

    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { 
            type: 'object',
            properties: {
              email: {
                type: 'string'
              },
              password: {
                type: 'string'
              },
            },
            required: ['email', 'password']
          },
          example: { 
            email: "Jhon.Doe@example.com",
            password: "password_example"
          }
        }
      }
    }
  */
  const { email, password } = req.body;

  try {
    const user = await service.getUserByEmail(email);
    /*
      #swagger.responses[401] = { 
        description: 'Email or password is wrong',
        content: {
          'application/json': {
             schema: { $ref: '#/definitions/Error' },
             example: {
              message: 'Email or password is wrong'
             }
           }
        } 
       }
    */
    if (!user) {
      throw Unauthorized("Email or password is wrong");
    }
    /*
      #swagger.responses[400] = { 
        description: 'Email not verified',
        content: {
          'application/json': {
             schema: { $ref: '#/definitions/Error' },
             example: {
              message: 'Email not verified'
             }
           }
        } 
      }
    */
    if (!user.verify) {
      throw BadRequest("Email not verified");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw Unauthorized("Email or password is wrong");
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, JWT_SECRET);

    const result = await service.updateUser(user._id, { token });
    /*
      #swagger.responses[200] = { 
        description: 'User login successfully',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/AuthorizedUser' },
            example: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjIxYTJkOTFlNTY3NzQyMzRkMWM0MCIsImlhdCI6MTY3NjgxMDgxN30.55lDbmtnFbdymuZKWHo_tTudKym1APGsCDSb7XFlIVQ',
              user: {
                id: '63ef667fc42e9578d819c035',
                email: 'Jhon.Doe@example.com',
                name: 'Jhon Doe'
              }
            }
          }
        } 
      }
    */
    res.json({
      token: result.token,
      user: {
        _id: result.id,
        name: result.name,
        email: result.email,
        phone: result.phone,
        city: result.city,
        birthday: result.birthday,
        avatarURL: result.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Logout'
    #swagger.description = 'Terminates the user session'

    #swagger.security = [{
      "JWT": []
    }]
  */
  try {
    const { _id } = req.user;

    await service.updateUser(_id, { token: null });
    /*
      #swagger.responses[204] = { 
        description: 'User logout successfully',
      }
    */
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const verifyToken = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Token verification'
    #swagger.description = 'Verifies the token via email letter link'

    #swagger.parameters['verificationToken'] = {
      in: 'query',
      required: true,
      description: 'Verification token',
      schema: { 
        type: 'string',
      }
    }
  */
  const { verificationToken } = req.params;

  try {
    const user = await service.getUserByVerificationToken(verificationToken);
    /*
      #swagger.responses[404] = { 
        description: 'User not found',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Not found'
            }
          }
        } 
      }
    */
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, JWT_SECRET);

    const result = await service.updateToken(user._id, {
      token,
      verificationToken: null,
      verify: true,
    });

    /*
      #swagger.responses[200] = { 
        description: 'Verification successful',
        content: {
        'application/json': {
          schema: { 
            type: 'object',
            description: "Result detail",
              properties: {
                message: {
                  type: 'string'
                },
              },
            },
            example: {
              message: 'Verification successful'
            }
          }
        }
      }
    */
    res.status(200).json({
      token: result.token,
      user: { _id: result.id, name: result.name, email: result.email },
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Email verification'
    #swagger.description = 'Sends a verification letter to the user's mail'

    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { 
            type: 'object',
            properties: {
              email: {
                type: 'string'
              },
            },
            required: ['email']
          },
          example: { 
            email: "Jhon.Doe@example.com",
          }
        }
      }
    }
  */
  const { email } = req.body;

  try {
    const user = await service.getUserByEmail(email);
    /*
      #swagger.responses[404] = { 
        description: 'User not found',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Not found'
            }
          }
        } 
      }
    */
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }
    /*
      #swagger.responses[400] = { 
        description: 'Verification has already been passed',
        content: {
          'application/json': {
            schema: { $ref: '#/definitions/Error' },
            example: {
              message: 'Verification has already been passed'
            }
          }
        } 
      }
    */
    if (user.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

    const verificationToken = uuidv4();

    await service.updateUser(user._id, {
      verificationToken,
    });

    const verifyURL = `${BASE_URI}/verify/${verificationToken}`;

    await sentVerifyURL(email, verifyURL);
    /*
      #swagger.responses[200] = { 
        description: 'Verification email sent',
        content: {
        'application/json': {
          schema: { 
            type: 'object',
            description: "Result detail",
              properties: {
                message: {
                  type: 'string'
                },
              },
            },
            example: {
              message: 'Verification email sent'
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
    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

const refreshUser = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Refresh user info'
    #swagger.description = 'refreshing user info'
    #swagger.security = [{"JWT": []}]
    #swagger.responses[200] = {
        description: 'Refreshing user info',
        content: {
          'application/json': {
           schema: { $ref: '#/definitions/RefreshUserInfo' },
           example:{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmJhNTI5OWZjOGQyZDVhMGZiZDZlZCIsImlhdCI6MTY3NzYxMzIyOH0.Z4VNvqhOuYmI-_1H4yGAqgi9uF3tnHyT4SgJE-Zajjw",
    "user": {
        "_id": "63fba5299fc8d2d5a0fbd6ed",
        "name": "user@gmail.com",
        "phone": "+380951231212",
        "city": "City, Counry",
        "avatarURL": "https://res.cloudinary.com/datobb5og/image/upload/v1677437744/avatars/rpohpgbnmigpfdlrkcfp.jpg"
    }
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

  if (!_id) {
    throw Unauthorized(401, "Not found");
  }

  try {
    const result = await service.refreshUser(_id);
    res.json({
      token: result.token,
      user: {
        _id: result._id,
        birthday: result.birthday,
        name: result.name,
        email: result.email,
        phone: result.phone,
        city: result.city,
        avatarURL: result.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, verifyToken, verifyEmail, refreshUser };
