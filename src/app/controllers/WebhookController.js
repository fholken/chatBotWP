import { MessagingService } from '../services/MessagingService.js';
import { config } from '../../config/environment.js';

const messagingService = new MessagingService();

export class WebhookController {
  async handleWebhookPost(req, res) {
    console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
    if (message?.type === "text") {
      await messagingService.replyToMessage(message); // Replicar el mensaje de texto a través de WhatsApp
      await messagingService.markMessageAsRead(message.id); // Marcar el mensaje como leído en WhatsApp
    }
    res.sendStatus(200);
  }

  verifyWebhook(req, res) {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === config.webhookVerifyToken) {
      res.status(200).send(challenge);
      console.log("Webhook verified successfully!");
    } else {
      res.sendStatus(403);
    }
  }
}
