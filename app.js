const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const newsRouter = require("./routes/api/news");
const servicesRouter = require("./routes/api/services");
const petsRouter = require("./routes/api/pets");
const noticesRouter = require("./routes/api/notices");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://pet-support-frontend-beta.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/news", newsRouter);
app.use("/api/friends", servicesRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/notices", noticesRouter);
app.use("/api/pets", petsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(500).json({ message: err.message });
});

module.exports = app;
