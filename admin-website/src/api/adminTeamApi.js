import api from './axios';

export const getTeamMembers = async () => {
  const response = await api.get('/team');

  return response.data;
};

export const getTeamMemberById = async (id) => {
  const response = await api.get(`/team/${id}`);

  return response.data;
};

// Admin-only team member details
export const getAdminTeamMemberById = async (id) => {
  const response = await api.get(`/team/admin/${id}`);

  return response.data;
};

export const uploadTeamImage = async (imageFile) => {
  const formData = new FormData();

  formData.append('image', imageFile);

  const response = await api.post('/team/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const createTeamMember = async (teamMemberData) => {
  const response = await api.post('/team', teamMemberData);

  return response.data;
};

export const updateTeamMember = async (id, teamMemberData) => {
  const response = await api.put(
    `/team/${id}`,
    teamMemberData
  );

  return response.data;
};

export const deleteTeamMember = async (id) => {
  const response = await api.delete(`/team/${id}`);

  return response.data;
};