const routes = require('express').Router();

const controllers = require('./app/controllers');

routes.get('/webhook', controllers.FacebookController.verifyToken);
routes.post('/webhook', controllers.FacebookController.checkEvent);

routes.post('/assistant', controllers.AssistantController.getResponse);

module.exports = routes;
