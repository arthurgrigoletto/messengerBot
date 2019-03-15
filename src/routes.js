const routes = require("express").Router();

const controllers = require("./app/controllers/api");

routes.get("/webhook", controllers.FacebookController.verifyToken);
routes.post("/webhook", controllers.FacebookController.checkEvent);

module.exports = routes;
