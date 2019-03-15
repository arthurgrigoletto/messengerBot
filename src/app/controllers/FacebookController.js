/* eslint-disable class-methods-use-this */

const services = require('../models/services/index');

class FacebookController {
  checkEvent(req, res) {
    const { entry, object } = req.body;

    if (object === 'page') {
      entry.map((ent) => {
        const webhookEvent = ent.messaging[0];

        // Get the sender PSID
        const senderPsid = webhookEvent.sender.id;

        if (webhookEvent.message) {
          services.MessengerService.handleMessage(senderPsid, webhookEvent.message);
        } else if (webhookEvent.postback) {
          services.MessengerService.handlePostback(senderPsid, webhookEvent.postback);
        }

        return webhookEvent;
      });

      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }
  }

  verifyToken(req, res) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    }
  }
}

module.exports = new FacebookController();
