const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const app = require("./app");

const { PORT = 8080, DB_HOST } = process.env;

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful.\nServer running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
