import axios from 'axios';
import { config } from '../config/environment.js';

export const axiosClient = axios.create({
  baseURL: `https://graph.facebook.com/${config.apiVersion}/${config.businessPhone}`,
  headers: {
    Authorization: `Bearer ${config.apiToken}`,
  },
});
