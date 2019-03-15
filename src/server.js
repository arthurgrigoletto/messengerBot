require("dotenv").config();
const express = require("express");
const routes = require("./routes");

class App {
  constructor() {
    this.express = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
  }

  routes() {
    this.express.use("/api", routes);
  }
}

module.exports = new App().express;
