export const getAdminTeamMemberById = async (id) => {
  const response = await api.get(`/team/admin/${id}`);

  return response.data;
};