import OpenAI from "openai";
import { config } from '../config/environment.js';

export const openAiClient = new OpenAI({
    apiKey: config.openaiApiKey
});