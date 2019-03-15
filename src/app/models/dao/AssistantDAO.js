/* eslint-disable no-underscore-dangle */

const Request = require('request-promise');

class AssistantDAO {
  constructor() {
    this._username = process.env.ASSISTANT_USERNAME;
    this._password = process.env.ASSISTANT_PASSWORD;
    this._workspaceID = process.env.WORKSPACE_ID;
    this._version = '2018-10-20';
    this._url = 'https://gateway.watsonplatform.net/assistant/api/v1/workspaces';
  }

  sendMessage(params) {
    const { input } = params;

    const response = Request({
      method: 'POST',
      url: `${this._url}/${this._workspaceID}/message`,
      qs: {
        version: this._version,
      },
      auth: {
        username: this._username,
        password: this._password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        input,
      },
      json: true,
    });
    return response;
  }
}

module.exports = new AssistantDAO();
