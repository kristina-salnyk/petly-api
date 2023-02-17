const { getServicesController } = require("../../controllers/services.controller");
const express = require("express");
const router = express.Router();

router.get("/", getServicesController);

module.exports = router;
