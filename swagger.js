const swaggerAutogen = require("swagger-autogen")();

const PORT = process.env.PORT || 3000;

const doc = {
  info: {
    title: "Pet support API",
    description: "Backend service for Pet support project",
  },
  host: `localhost:${PORT}`,
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
