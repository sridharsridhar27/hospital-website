const {
  getAllConditions,
  getConditionById,
  getConditionBySlug,
  createCondition,
  updateCondition,
  deleteCondition,
} = require('../services/conditionService');

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


/*
 * GET /api/conditions
 * Get all conditions
 */
const getAllConditionsController = async (
  req,
  res
) => {
  try {
    const conditions =
      await getAllConditions();

    const conditionsWithUrls =
      await Promise.all(
        conditions.map(async (condition) => ({
          ...condition,
          imageUrl:
            await getConditionImageUrl(
              condition.imageKey
            ),
        }))
      );

    return res.status(200).json({
      success: true,
      data: conditionsWithUrls,
    });
  } catch (error) {
    console.error(
      'Get all conditions error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch conditions.',
    });
  }
};


/*
 * GET /api/conditions/:id
 * Get one condition by ID
 */
const getConditionByIdController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const condition =
      await getConditionById(id);

    if (!condition) {
      return res.status(404).json({
        success: false,
        message: 'Condition not found.',
      });
    }

    const imageUrl =
      await getConditionImageUrl(
        condition.imageKey
      );

    return res.status(200).json({
      success: true,
      data: {
        ...condition,
        imageUrl,
      },
    });
  } catch (error) {
    console.error(
      'Get condition by ID error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch condition.',
    });
  }
};


/*
 * GET /api/conditions/slug/:slug
 * Get one condition by slug
 */
const getConditionBySlugController = async (
  req,
  res
) => {
  try {
    const { slug } = req.params;

    const condition =
      await getConditionBySlug(slug);

    if (!condition) {
      return res.status(404).json({
        success: false,
        message: 'Condition not found.',
      });
    }

    const imageUrl =
      await getConditionImageUrl(
        condition.imageKey
      );

    return res.status(200).json({
      success: true,
      data: {
        ...condition,
        imageUrl,
      },
    });
  } catch (error) {
    console.error(
      'Get condition by slug error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch condition.',
    });
  }
};


/*
 * POST /api/conditions
 * Create condition
 */
const createConditionController = async (
  req,
  res
) => {
  try {
    const {
      name,
      slug,
      description,
      imageKey,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Condition name is required.',
      });
    }

    if (!slug?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Condition slug is required.',
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          'Condition description is required.',
      });
    }

    if (!imageKey) {
      return res.status(400).json({
        success: false,
        message:
          'Condition image is required.',
      });
    }

    const condition =
      await createCondition({
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description.trim(),
        imageKey: imageKey || null,
      });

    return res.status(201).json({
      success: true,
      message:
        'Condition created successfully.',
      data: condition,
    });
  } catch (error) {
    console.error(
      'Create condition error:',
      error
    );

    /*
     * Prisma unique constraint.
     */
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message:
          'A condition with this slug already exists.',
      });
    }

    return res.status(500).json({
      success: false,
      message:
        'Failed to create condition.',
    });
  }
};


/*
 * PUT /api/conditions/:id
 * Update condition
 */
const updateConditionController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const existingCondition =
      await getConditionById(id);

    if (!existingCondition) {
      return res.status(404).json({
        success: false,
        message: 'Condition not found.',
      });
    }

    const {
      name,
      slug,
      description,
      imageKey,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Condition name is required.',
      });
    }

    if (!slug?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Condition slug is required.',
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          'Condition description is required.',
      });
    }

    /*
     * If no new imageKey is provided,
     * keep the existing image.
     */
    if (
      !imageKey &&
      !existingCondition.imageKey
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Condition image is required.',
      });
    }

    const condition =
      await updateCondition(
        id,
        {
          name: name.trim(),
          slug: slug.trim().toLowerCase(),
          description: description.trim(),
          imageKey:
            imageKey ??
            existingCondition.imageKey,
        }
      );

    return res.status(200).json({
      success: true,
      message:
        'Condition updated successfully.',
      data: condition,
    });
  } catch (error) {
    console.error(
      'Update condition error:',
      error
    );

    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message:
          'A condition with this slug already exists.',
      });
    }

    return res.status(500).json({
      success: false,
      message:
        'Failed to update condition.',
    });
  }
};


/*
 * DELETE /api/conditions/:id
 * Delete condition
 */
const deleteConditionController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    /*
     * First find the condition so we can
     * get the associated R2 imageKey.
     */
    const existingCondition =
      await getConditionById(id);

    if (!existingCondition) {
      return res.status(404).json({
        success: false,
        message: 'Condition not found.',
      });
    }

    /*
     * Delete image from Cloudflare R2
     * if the condition has an image.
     */
    if (existingCondition.imageKey) {
      await deleteConditionImage(
        existingCondition.imageKey
      );
    }

    /*
     * Delete database record.
     */
    await deleteCondition(id);

    return res.status(200).json({
      success: true,
      message:
        'Condition and associated image deleted successfully.',
    });
  } catch (error) {
    console.error(
      'Delete condition error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to delete condition.',
    });
  }
};

/*
 * GET /api/conditions/:conditionId/items
 * Get all items belonging to a condition
 */
const getConditionItemsController = async (
  req,
  res
) => {
  try {
    const { conditionId } = req.params;

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
 * GET /api/conditions/items/:id
 * Get one condition item
 */
const getConditionItemByIdController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const item =
      await getConditionItemById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Condition item not found.',
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
 * POST /api/conditions/:conditionId/items
 * Create condition item
 */
const createConditionItemController = async (
  req,
  res
) => {
  try {
    const { conditionId } = req.params;

    const {
      name,
      description,
      imageKey,
    } = req.body;

    const condition =
      await getConditionById(conditionId);

    if (!condition) {
      return res.status(404).json({
        success: false,
        message: 'Condition not found.',
      });
    }

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          'Condition item name is required.',
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          'Condition item description is required.',
      });
    }

    const item =
      await createConditionItem({
        conditionId,
        name: name.trim(),
        description: description.trim(),
        imageKey: imageKey || null,
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
 * PUT /api/conditions/items/:id
 * Update condition item
 */
const updateConditionItemController = async (
  req,
  res
) => {
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

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          'Condition item name is required.',
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          'Condition item description is required.',
      });
    }

    const item =
      await updateConditionItem(
        id,
        {
          name: name.trim(),
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
 * DELETE /api/conditions/items/:id
 * Delete condition item
 */
const deleteConditionItemController = async (
  req,
  res
) => {
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

    /*
     * Delete associated image from R2.
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
  getAllConditionsController,
  getConditionByIdController,
  getConditionBySlugController,
  createConditionController,
  updateConditionController,
  deleteConditionController,
  getConditionItemsController,
  getConditionItemByIdController,
  createConditionItemController,
  updateConditionItemController,
  deleteConditionItemController,
};