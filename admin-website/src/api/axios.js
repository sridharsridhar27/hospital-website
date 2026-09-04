import axios from 'axios';

import { getAdminToken } from '../utils/adminAuth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    'Content-Type': 'application/json',
  },
});

/*
 * Attach Admin JWT to every API request
 * when the admin is authenticated.
 */
api.interceptors.request.use(
  (config) => {
    const token = getAdminToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;