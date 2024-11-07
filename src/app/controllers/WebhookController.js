import { MessagingService } from '../services/MessagingService.js';
import { config } from '../../config/environment.js';

const messagingService = new MessagingService();

export class WebhookController {

  constructor() {
    this.appointmentState = {};
  }
  async handleWebhookPost(req, res) {
    console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
    const senderInfo = req.body.entry?.[0]?.changes[0]?.value?.contacts?.[0];
    if (message?.type === "text") {
      const incomingMessage = message.text.body.toLowerCase().trim();
      if (this.isGreeting(incomingMessage)) {
        await this.sendWelcomeMessage(message.from, message.id, senderInfo);
        await this.sendWelcomeMenu(message.from);
      } 
      // else {
      //   await messagingService.replyToMessage(message); // Replicar el mensaje de texto a través de WhatsApp
      // }
      await messagingService.markMessageAsRead(message.id); // Marcar el mensaje como leído en WhatsApp        
    } else if (message?.type === "interactive") {
      const opcion = message?.interactive?.button_reply?.id;
      await this.handleMenuOption(message.from, opcion);
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

  isGreeting(message) {
    const gretings = ["hola", "buenos dias", "buenas tardes", "buenas noches", "hoy es un buen dia", "buenos dias"];
    return gretings.includes(message);
  }

  getSenderName(senderInfo) {
    return senderInfo?.profile?.name?.split(" ")[0] || senderInfo.wa_id || "";
  }
  async sendWelcomeMessage(to, messageId, senderInfo) {
    const name = this.getSenderName(senderInfo);
    const welcomeMessage = `Hola ${name}, Bienvenido a Una cosa de locos.`;
    await messagingService.sendMessage(to, welcomeMessage, messageId);
  }

  async sendWelcomeMenu(to) {
    const menuMessage = `Elija una opción:`;
    const buttons = [
      { type: "reply", reply: { id: "option_1", title: "Comprar" } },
      { type: "reply", reply: { id: "option_2", title: "Consultar" } },
      { type: "reply", reply: { id: "option_3", title: "Distribuidores" } },
    ];
    await messagingService.sendInteractiveButtons(to, menuMessage, buttons);
  }

  async handleMenuOption(to, option) {
    let response;
    switch (option) {
      case "option_1":
        response = "Veo que estas interesado en comprar";
        break;
      case "option_2":
        response = "Veo que estas interesado en consultar";
        break;
      case "option_3":
        response = "Veo que estas interesado en consultar distribuidores";
        break;
      default:
        response = "Lo siento no te entendí tu selección";
        break;
    }
    await messagingService.sendMessage(to, response);
  }

}
