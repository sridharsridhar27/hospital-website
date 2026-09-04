import api from './axios';

export const getConditions = async () => {
  const response = await api.get('/conditions');

  return response.data;
};

export const getConditionById = async (id) => {
  const response = await api.get(
    `/conditions/${id}`
  );

  return response.data;
};

export const getConditionBySlug = async (slug) => {
  const response = await api.get(
    `/conditions/slug/${slug}`
  );

  return response.data;
};

export const uploadConditionImage = async (
  imageFile
) => {
  const formData = new FormData();

  formData.append('image', imageFile);

  const response = await api.post(
    '/conditions/upload',
    formData,
    {
      headers: {
        'Content-Type':
          'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const createCondition = async (
  conditionData
) => {
  const response = await api.post(
    '/conditions',
    conditionData
  );

  return response.data;
};

export const updateCondition = async (
  id,
  conditionData
) => {
  const response = await api.put(
    `/conditions/${id}`,
    conditionData
  );

  return response.data;
};

export const deleteCondition = async (id) => {
  const response = await api.delete(
    `/conditions/${id}`
  );

  return response.data;
};


/*
 * =========================================================
 * CONDITION ITEMS
 * =========================================================
 */


/*
 * Get all items belonging to one condition.
 *
 * GET /api/conditions/:conditionId/items
 */
export const getConditionItems = async (
  conditionId
) => {
  const response = await api.get(
    `/conditions/${conditionId}/items`
  );

  return response.data;
};


/*
 * Get one condition item by ID.
 *
 * GET /api/conditions/items/:id
 */
export const getConditionItemById = async (
  id
) => {
  const response = await api.get(
    `/conditions/items/${id}`
  );

  return response.data;
};


/*
 * Create an item inside a condition.
 *
 * POST /api/conditions/:conditionId/items
 */
export const createConditionItem = async (
  conditionId,
  itemData
) => {
  const response = await api.post(
    `/conditions/${conditionId}/items`,
    itemData
  );

  return response.data;
};


/*
 * Update a condition item.
 *
 * PUT /api/conditions/items/:id
 */
export const updateConditionItem = async (
  id,
  itemData
) => {
  const response = await api.put(
    `/conditions/items/${id}`,
    itemData
  );

  return response.data;
};


/*
 * Delete a condition item.
 *
 * DELETE /api/conditions/items/:id
 */
export const deleteConditionItem = async (
  id
) => {
  const response = await api.delete(
    `/conditions/items/${id}`
  );

  return response.data;
};