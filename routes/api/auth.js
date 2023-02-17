const express = require("express");

const validation = require("../../middlewares/validation");
const tryCatchWrapper = require("../../helpers/tryCatchWrapper");
const { register, login, logout } = require("../../controllers/auth.controller");
const { registerSchema, loginSchema } = require("../../schemas/authSchema");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.post("/register", validation(registerSchema), tryCatchWrapper(register));
router.post("/login", validation(loginSchema), tryCatchWrapper(login));
router.get("/logout", auth, tryCatchWrapper(logout));

module.exports = router;
