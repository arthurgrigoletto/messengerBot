"use strict";
const express = require("express");
const bodyParser = require("body-parser");

const facebook = require("../controllers/api/facebook");

module.exports = function() {
  const app = express();

  // Body Parser Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Use Routes
  app.use("/api/webhook/facebook", facebook);

  return app;
};
