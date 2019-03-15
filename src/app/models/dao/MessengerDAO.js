/* eslint-disable class-methods-use-this */

const Request = require('request-promise');

class MessengerDAO {
  getUserInfo(senderPsid) {
    return Request({
      method: 'GET',
      uri: `https://graph.facebook.com/${senderPsid}`,
      qs: {
        fields: 'first_name, last_name',
        access_token: process.env.ACCESS_TOKEN,
      },
      json: true,
    });
  }

  makeRequest(requestBody) {
    Request({
      method: 'POST',
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: process.env.ACCESS_TOKEN,
      },
      json: requestBody,
    });
  }
}

module.exports = new MessengerDAO();
