const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());

const storage = multer.memoryStorage();

const imageUpload = multer({storage}).single("file");


module.exports = imageUpload;