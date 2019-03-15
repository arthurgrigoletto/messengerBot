/* eslint-disable class-methods-use-this */

const services = require('../models/services');

class AssistantController {
  async getResponse(req, res) {
    const { input } = req.body;

    const response = await services.AssistantService.sendMessage({ input });

    res.json(response);
  }
}

module.exports = new AssistantController();
