/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

const Request = require('request-promise');
const AssistantService = require('./AssistantService');

const delay = 1200;

class MessengerService {
  async handleMessage(senderPsid, receivedMessage) {
    let response;
    const user = await this.getUserInfo(senderPsid);

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
      const assistantResponse = await AssistantService.sendMessage(paramsToWatson);
      response = {
        text: assistantResponse.output.text[0],
      };
    }

    // Sends the response message
    this.callSendAPI(senderPsid, response);
  }

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
    Request(
      {
        method: 'POST',
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
          access_token: process.env.ACCESS_TOKEN,
        },
        json: requestBody,
      },
      (err, res, body) => {
        if (!err) {
          console.log('Message Sent!');
        } else {
          console.error(`Unable to send message: ${err}`);
        }
      },
    );
  }

  endTyping(senderPsid) {
    const requestBody = {
      recipient: {
        id: senderPsid,
      },
      sender_action: 'typing_off',
    };
    Request(
      {
        method: 'POST',
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
          access_token: process.env.ACCESS_TOKEN,
        },
        json: requestBody,
      },
      (err, res, body) => {
        if (!err) {
          console.log('Message Sent!');
        } else {
          console.error(`Unable to send message: ${err}`);
        }
      },
    );
  }

  markSeen(senderPsid) {
    const requestBody = {
      recipient: {
        id: senderPsid,
      },
      sender_action: 'mark_seen',
    };
    Request(
      {
        method: 'POST',
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
          access_token: process.env.ACCESS_TOKEN,
        },
        json: requestBody,
      },
      (err, res, body) => {
        if (!err) {
          console.log('Message Sent!');
        } else {
          console.error(`Unable to send message: ${err}`);
        }
      },
    );
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
      Request(
        {
          method: 'POST',
          uri: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {
            access_token: process.env.ACCESS_TOKEN,
          },
          json: requestBody,
        },
        (err, res, body) => {
          if (!err) {
            console.log('Message Sent!');
          } else {
            console.error(`Unable to send message: ${err}`);
          }
        },
      );
      this.endTyping(senderPsid);
    }, delay * 2);
  }
}

module.exports = new MessengerService();
