/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

const daos = require('../dao');

const delay = 1200;

class MessengerService {
  async handleMessage(senderPsid, receivedMessage) {
    let response;
    const user = await daos.MessengerDAO.getUserInfo(senderPsid);

    const { firstName } = user;

    const paramsToWatson = {
      input: {
        text: receivedMessage.text,
      },
      context: {
        username: firstName,
      },
    };

    if (receivedMessage.text) {
      const { output } = await daos.AssistantDAO.sendMessage(paramsToWatson);
      response = {
        text: output.text[0],
      };
    }

    // Sends the response message
    this.callSendAPI(senderPsid, response);
  }

  handlePostback(senderPsid, receivedPostback) {
    let response;

    const { payload } = receivedPostback;

    if (payload === 'yes') {
      response = { text: 'Thanks!' };
    } else if (payload === 'no') {
      response = { text: 'Oops, try sending another image.' };
    }
    this.callSendAPI(senderPsid, response);
  }

  sendTyping(senderPsid) {
    const requestBody = {
      recipient: {
        id: senderPsid,
      },
      sender_action: 'typing_on',
    };
    daos.MessengerDAO.makeRequest(requestBody);
  }

  endTyping(senderPsid) {
    const requestBody = {
      recipient: {
        id: senderPsid,
      },
      sender_action: 'typing_off',
    };
    daos.MessengerDAO.makeRequest(requestBody);
  }

  markSeen(senderPsid) {
    const requestBody = {
      recipient: {
        id: senderPsid,
      },
      sender_action: 'mark_seen',
    };
    daos.MessengerDAO.makeRequest(requestBody);
  }

  async callSendAPI(senderPsid, response) {
    // Construct the message body
    const requestBody = {
      recipient: {
        id: senderPsid,
      },
      message: response,
    };

    this.markSeen(senderPsid);
    setTimeout(() => {
      this.sendTyping(senderPsid);
    }, delay);
    setTimeout(() => {
      daos.MessengerDAO.makeRequest(requestBody);
      this.endTyping(senderPsid);
    }, delay * 2);
  }
}

module.exports = new MessengerService();
