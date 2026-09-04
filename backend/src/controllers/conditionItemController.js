const {
  getConditionItems,
  getConditionItemById,
  createConditionItem,
  updateConditionItem,
  deleteConditionItem,
} = require('../services/conditionItemService');

const {
  getConditionImageUrl,
  deleteConditionImage,
} = require('../services/conditionImageService');

const {
  getConditionById,
} = require('../services/conditionService');


/*
 * =========================================================
 * GET /api/conditions/:conditionId/items
 * Get all items for one condition
 * =========================================================
 */
const getConditionItemsController = async (
  req,
  res
) => {
  try {
    const { conditionId } = req.params;

    /*
     * Make sure the parent condition exists.
     */
    const condition =
      await getConditionById(conditionId);

    if (!condition) {
      return res.status(404).json({
        success: false,
        message: 'Condition not found.',
      });
    }

    const items =
      await getConditionItems(conditionId);

    /*
     * Add signed R2 image URL to every item.
     */
    const itemsWithUrls =
      await Promise.all(
        items.map(async (item) => ({
          ...item,

          imageUrl:
            await getConditionImageUrl(
              item.imageKey
            ),
        }))
      );

    return res.status(200).json({
      success: true,
      data: itemsWithUrls,
    });
  } catch (error) {
    console.error(
      'Get condition items error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to fetch condition items.',
    });
  }
};


/*
 * =========================================================
 * GET /api/condition-items/:id
 * Get one condition item
 * =========================================================
 */
const getConditionItemByIdController =
  async (req, res) => {
    try {
      const { id } = req.params;

      const item =
        await getConditionItemById(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message:
            'Condition item not found.',
        });
      }

      const imageUrl =
        await getConditionImageUrl(
          item.imageKey
        );

      return res.status(200).json({
        success: true,

        data: {
          ...item,
          imageUrl,
        },
      });
    } catch (error) {
      console.error(
        'Get condition item by ID error:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Failed to fetch condition item.',
      });
    }
  };


/*
 * =========================================================
 * POST /api/conditions/:conditionId/items
 * Create condition item
 * =========================================================
 */
const createConditionItemController =
  async (req, res) => {
    try {
      const { conditionId } =
        req.params;

      const {
        name,
        description,
        imageKey,
      } = req.body;

      /*
       * Make sure the parent condition exists.
       */
      const condition =
        await getConditionById(
          conditionId
        );

      if (!condition) {
        return res.status(404).json({
          success: false,
          message:
            'Condition not found.',
        });
      }

      /*
       * Validate name.
       */
      if (!name?.trim()) {
        return res.status(400).json({
          success: false,
          message:
            'Condition item name is required.',
        });
      }

      /*
       * Validate description.
       */
      if (!description?.trim()) {
        return res.status(400).json({
          success: false,
          message:
            'Condition item description is required.',
        });
      }

      /*
       * Image is required for each item.
       */
      if (!imageKey) {
        return res.status(400).json({
          success: false,
          message:
            'Condition item image is required.',
        });
      }

      const item =
        await createConditionItem({
          conditionId,

          name:
            name.trim(),

          description:
            description.trim(),

          imageKey,
        });

      return res.status(201).json({
        success: true,

        message:
          'Condition item created successfully.',

        data: item,
      });
    } catch (error) {
      console.error(
        'Create condition item error:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Failed to create condition item.',
      });
    }
  };


/*
 * =========================================================
 * PUT /api/condition-items/:id
 * Update condition item
 * =========================================================
 */
const updateConditionItemController =
  async (req, res) => {
    try {
      const { id } = req.params;

      const existingItem =
        await getConditionItemById(id);

      if (!existingItem) {
        return res.status(404).json({
          success: false,
          message:
            'Condition item not found.',
        });
      }

      const {
        name,
        description,
        imageKey,
      } = req.body;

      /*
       * Validate name.
       */
      if (!name?.trim()) {
        return res.status(400).json({
          success: false,
          message:
            'Condition item name is required.',
        });
      }

      /*
       * Validate description.
       */
      if (!description?.trim()) {
        return res.status(400).json({
          success: false,
          message:
            'Condition item description is required.',
        });
      }

      /*
       * If no new image is provided,
       * keep the existing image.
       */
      if (
        !imageKey &&
        !existingItem.imageKey
      ) {
        return res.status(400).json({
          success: false,
          message:
            'Condition item image is required.',
        });
      }

      const item =
        await updateConditionItem(
          id,
          {
            name:
              name.trim(),

            description:
              description.trim(),

            imageKey:
              imageKey ??
              existingItem.imageKey,
          }
        );

      return res.status(200).json({
        success: true,

        message:
          'Condition item updated successfully.',

        data: item,
      });
    } catch (error) {
      console.error(
        'Update condition item error:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Failed to update condition item.',
      });
    }
  };


/*
 * =========================================================
 * DELETE /api/condition-items/:id
 * Delete condition item
 * =========================================================
 */
const deleteConditionItemController =
  async (req, res) => {
    try {
      const { id } = req.params;

      /*
       * Find item first so we can get
       * the associated R2 imageKey.
       */
      const existingItem =
        await getConditionItemById(id);

      if (!existingItem) {
        return res.status(404).json({
          success: false,
          message:
            'Condition item not found.',
        });
      }

      /*
       * Delete image from Cloudflare R2.
       */
      if (existingItem.imageKey) {
        await deleteConditionImage(
          existingItem.imageKey
        );
      }

      /*
       * Delete database record.
       */
      await deleteConditionItem(id);

      return res.status(200).json({
        success: true,

        message:
          'Condition item and associated image deleted successfully.',
      });
    } catch (error) {
      console.error(
        'Delete condition item error:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Failed to delete condition item.',
      });
    }
  };


module.exports = {
  getConditionItemsController,
  getConditionItemByIdController,
  createConditionItemController,
  updateConditionItemController,
  deleteConditionItemController,
};