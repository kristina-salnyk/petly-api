const express = require("express");
const { validateSchema } = require("../../middlewares/validation");
const {
  register,
  login,
  logout,
  verifyToken,
  verifyEmail,
} = require("../../controllers/auth.controller");
const { registerSchema, loginSchema } = require("../../schemas/authSchema");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.get("/logout", auth, logout);

router.get("/verify/:verificationToken", verifyToken);

router.post("/verify", verifyEmail);

module.exports = router;
