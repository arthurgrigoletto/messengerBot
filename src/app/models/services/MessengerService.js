const Request = require("request-promise");
const AssistantService = require("./AssistantService");
const delay = 1200;

class MessengerService {
  async handleMessage(sender_psid, received_message) {
    let response;
    let user = await this.getUserInfo(sender_psid);

    let first_name = user.first_name;

    let paramsToWatson = {
      input: {
        text: received_message.text
      },
      context: {
        username: first_name
      }
    };

    if (received_message.text) {
      const assistantResponse = await AssistantService.sendMessage(
        paramsToWatson
      );
      response = {
        text: assistantResponse.output.text[0]
      };
    }

    // Sends the response message
    this.callSendAPI(sender_psid, response);
  }

  getUserInfo(sender_psid) {
    return Request({
      method: "GET",
      uri: `https://graph.facebook.com/${sender_psid}`,
      qs: {
        fields: "first_name, last_name",
        access_token: process.env.ACCESS_TOKEN
      },
      json: true
    });
  }

  handlePostback(sender_psid, received_postback) {
    let response;

    let payload = received_postback.payload;

    if (payload === "yes") {
      response = { text: "Thanks!" };
    } else if (payload === "no") {
      response = { text: "Oops, try sending another image." };
    }
    this.callSendAPI(sender_psid, response);
  }

  sendTyping(sender_psid) {
    let request_body = {
      recipient: {
        id: sender_psid
      },
      sender_action: "typing_on"
    };
    Request(
      {
        method: "POST",
        uri: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
          access_token: process.env.ACCESS_TOKEN
        },
        json: request_body
      },
      (err, res, body) => {
        if (!err) {
          console.log("Message Sent!");
        } else {
          console.error(`Unable to send message: ${err}`);
        }
      }
    );
  }

  endTyping(sender_psid) {
    let request_body = {
      recipient: {
        id: sender_psid
      },
      sender_action: "typing_off"
    };
    Request(
      {
        method: "POST",
        uri: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
          access_token: process.env.ACCESS_TOKEN
        },
        json: request_body
      },
      (err, res, body) => {
        if (!err) {
          console.log("Message Sent!");
        } else {
          console.error(`Unable to send message: ${err}`);
        }
      }
    );
  }

  markSeen(sender_psid) {
    let request_body = {
      recipient: {
        id: sender_psid
      },
      sender_action: "mark_seen"
    };
    Request(
      {
        method: "POST",
        uri: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
          access_token: process.env.ACCESS_TOKEN
        },
        json: request_body
      },
      (err, res, body) => {
        if (!err) {
          console.log("Message Sent!");
        } else {
          console.error(`Unable to send message: ${err}`);
        }
      }
    );
  }

  async callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
      recipient: {
        id: sender_psid
      },
      message: response
    };

    this.markSeen(sender_psid);
    setTimeout(() => {
      this.sendTyping(sender_psid);
    }, delay);
    setTimeout(() => {
      Request(
        {
          method: "POST",
          uri: "https://graph.facebook.com/v2.6/me/messages",
          qs: {
            access_token: process.env.ACCESS_TOKEN
          },
          json: request_body
        },
        (err, res, body) => {
          if (!err) {
            console.log("Message Sent!");
          } else {
            console.error(`Unable to send message: ${err}`);
          }
        }
      );
      this.endTyping(sender_psid);
    }, delay * 2);
  }
}

module.exports = new MessengerService();
