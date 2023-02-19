const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Conflict, Unauthorized } = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../models/user");
const { sentVerifyURL } = require("../services/verification");

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Registration'
    #swagger.description = 'Creates a new user'

    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: { $ref: '#/definitions/AddUser' },
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
  const {
    protocol,
    headers: { host },
  } = req;

  try {
    const user = await User.findOne({ email });
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
      throw Conflict("Email in use");
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

    const verifyURL = `${protocol}://${host}/api/auth/verify/${verificationToken}`;

    await sentVerifyURL(email, verifyURL);
    /*
      #swagger.responses[201] = { 
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

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw Unauthorized("Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw Unauthorized(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      id: user._id,
      email,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({
    message: "Logout success",
  });
};

module.exports = { register, login, logout };
