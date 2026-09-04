import api from './axios';

export const getServicesByCategory = async (
  category
) => {
  const response = await api.get(
    `/services/category/${category}`
  );

  return response.data;
};