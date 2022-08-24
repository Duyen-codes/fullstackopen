const config = require("./utils/config");
const express = require("express"); // import express module
require("express-async-errors");
const app = express(); // create an express application
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");

// import user router
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info("connected to", config.MONGODB_URI);
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB: ", error.message);
  });

app.use(cors());
// createServer method of http module to create a new web/http server, assigned to app variable
app.use(express.static("build"));
app.use(express.json()); // without it request.body is undefined

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
