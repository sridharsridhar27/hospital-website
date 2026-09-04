import api from './axios';

/*
 * =========================================================
 * CONDITIONS
 * =========================================================
 */

/*
 * Get all conditions.
 *
 * GET /api/conditions
 */
export const getConditions = async () => {
  const response = await api.get('/conditions');

  return response.data;
};


/*
 * Get one condition by slug.
 *
 * GET /api/conditions/slug/:slug
 */
export const getConditionBySlug = async (
  slug
) => {
  const response = await api.get(
    `/conditions/slug/${slug}`
  );

  return response.data;
};


/*
 * Get all items belonging to a condition.
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