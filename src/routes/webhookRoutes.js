import express from 'express';
import { WebhookController } from '../app/controllers/WebhookController.js';

const router = express.Router();
const webhookController = new WebhookController();

router.post('/webhook', (req, res) => webhookController.handleWebhookPost(req, res));
router.get('/webhook', (req, res) => webhookController.verifyWebhook(req, res));

export default router;
