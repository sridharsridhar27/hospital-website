import api from './axios';

export const getGalleryItems = async () => {
  const response = await api.get('/gallery');

  return response.data;
};