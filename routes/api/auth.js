const express = require("express");
const { validateSchema } = require("../../middlewares/validation");
const {
  register,
  login,
  logout,
  verifyToken,
  verifyEmail,
  refreshUser,
} = require("../../controllers/auth.controller");
const { registerSchema, loginSchema } = require("../../schemas/authSchema");
const { auth } = require("../../middlewares/auth");
const googleAuthController = require("../../controllers/google-auth.controller");

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.get("/logout", auth, logout);

router.get("/refresh", auth, refreshUser);

router.get("/verify/:verificationToken", verifyToken);

router.post("/verify", verifyEmail);

router.get("/google", googleAuthController.googleAuth);

router.get("/google-redirect", googleAuthController.googleRedirect);

module.exports = router;
