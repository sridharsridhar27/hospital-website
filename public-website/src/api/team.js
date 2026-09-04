import api from './axios';

export const getTeamMembers = async () => {
  const response = await api.get('/team');

  return response.data;
};