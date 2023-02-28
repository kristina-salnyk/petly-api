const queryString = require("querystring");
const axios = require("axios");
const service = require("../services/users");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const { JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST_URI, BASE_URI } = process.env;

const googleAuth = async (req, res) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Redirects user to Google OAuth2 authorization page.'
     #swagger.responses[302] = { 
       description: 'Redirects user to Google OAuth2 authorization page.',
     }
  */
  const params = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${HOST_URI}/api/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  };

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${queryString.stringify(params)}`
  );
};

const googleRedirect = async (req, res, next) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Handles the redirect from Google OAuth2 authorization page.'
     #swagger.responses[302] = { 
       description: 'Redirects user to a client page with a JWT token',
     }
  */
  const {
    protocol,
    headers: { host },
    originalUrl,
  } = req;

  const fullUrl = `${protocol}://${host}${originalUrl}`;
  const urlObj = new URL(fullUrl);

  const code = urlObj.searchParams.get("code");

  const token = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${HOST_URI}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${token.data.access_token}`,
    },
  });

  const { email, given_name: name, picture: avatarURL, verified_email: verify } = userData.data;

  try {
    let user = await service.getUserByEmail(email);

    if (!user) {
      user = await User.create({
        email,
        name,
        avatarURL,
        verify,
      });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET);

    const result = await service.updateUser(user._id, { token });

    return res.redirect(
      `${BASE_URI}/google-auth?token=${result.token}` // token instead of email
    );
  } catch (error) {
    return res.redirect(`${BASE_URI}/google-auth?error=${error}`);
  }
};

module.exports = { googleAuth, googleRedirect };
