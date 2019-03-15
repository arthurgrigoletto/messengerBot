const Request = require("request-promise");

class AssistantService {
  constructor() {
    this._username = process.env.ASSISTANT_USERNAME;
    this._password = process.env.ASSISTANT_PASSWORD;
    this._workspaceID = process.env.WORKSPACE_ID;
    this._version = "2018-07-10";
    this._url =
      "https://gateway.watsonplatform.net/assistant/api/v1/workspaces";
  }

  sendMessage(params) {
    params = params || {};

    var response = Request({
      method: "POST",
      url: `${this._url}/${this._workspaceID}/message`,
      qs: {
        version: this._version
      },
      auth: {
        username: this._username,
        password: this._password
      },
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        input: params.input,
        context: params.context
      },
      json: true
    });

    return response;
  }
}

module.exports = new AssistantService();
