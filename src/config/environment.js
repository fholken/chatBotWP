import 'dotenv/config';

export const config = {
  webhookVerifyToken: process.env.WEBHOOK_VERIFY_TOKEN,
  apiToken: process.env.API_TOKEN,
  port: process.env.PORT || 3000,
  apiVersion: process.env.API_VERSION,
  businessPhone: process.env.BUSINESS_PHONE,

  openaiApiKey: process.env.OPENAI_API_KEY,
};
