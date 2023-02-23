const { getServices } = require("../../controllers/services.controller");
const express = require("express");
const router = express.Router();

router.get("/", getServices);

module.exports = router;
