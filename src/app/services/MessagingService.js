import { axiosClient } from '../../infrastructure/axiosClient.js';

export class MessagingService {

  // Replicar el mensaje de texto a través de WhatsApp
  async replyToMessage(message) {
    return await axiosClient.post('/messages', {
      messaging_product: 'whatsapp',
      to: message.from,
      text: { body: 'Echo: ' + message.text.body },
      context: { message_id: message.id },
    });
  }

  // Marcar el mensaje como leído en WhatsApp
  async markMessageAsRead(messageId) {
    return await axiosClient.post('/messages', {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId,
    });
  }
}
