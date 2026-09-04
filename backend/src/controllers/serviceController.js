
const {
  getAllServices,
  getServicesByCategory,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../services/serviceService');

const {
  getServiceImageUrl,
  deleteServiceImage,
} = require('../services/serviceImageService');

/*
 * =========================================================
 * ALLOWED SERVICE CATEGORIES
 * =========================================================
 */

const allowedCategories = [
  'GENERAL',
  'ORTHOPAEDIC',
  'OBSTETRICS_GYNAECOLOGY',
];

/*
 * =========================================================
 * GET /api/services
 * Get all services
 * =========================================================
 */

const getAllServicesController = async (req, res) => {
  try {
    const services = await getAllServices();

    const servicesWithUrls = await Promise.all(
      services.map(async (service) => ({
        ...service,
        imageUrl: await getServiceImageUrl(
          service.imageKey
        ),
      }))
    );

    return res.status(200).json({
      success: true,
      data: servicesWithUrls,
    });
  } catch (error) {
    console.error(
      'Get all services error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch services.',
    });
  }
};

/*
 * =========================================================
 * GET /api/services/category/:category
 * Get services by category
 * =========================================================
 */

const getServicesByCategoryController = async (
  req,
  res
) => {
  try {
    const { category } = req.params;

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service category.',
      });
    }

    const services =
      await getServicesByCategory(category);

    const servicesWithUrls = await Promise.all(
      services.map(async (service) => ({
        ...service,
        imageUrl: await getServiceImageUrl(
          service.imageKey
        ),
      }))
    );

    return res.status(200).json({
      success: true,
      data: servicesWithUrls,
    });
  } catch (error) {
    console.error(
      'Get services by category error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to fetch services by category.',
    });
  }
};

/*
 * =========================================================
 * GET /api/services/:id
 * Get one service
 * =========================================================
 */

const getServiceByIdController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const service =
      await getServiceById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    const imageUrl =
      await getServiceImageUrl(
        service.imageKey
      );

    return res.status(200).json({
      success: true,
      data: {
        ...service,
        imageUrl,
      },
    });
  } catch (error) {
    console.error(
      'Get service by ID error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch service.',
    });
  }
};

/*
 * =========================================================
 * POST /api/services
 * Create service
 *
 * name        -> REQUIRED
 * description -> OPTIONAL
 * image       -> OPTIONAL
 * =========================================================
 */

const createServiceController = async (
  req,
  res
) => {
  try {
    const {
      category,
      name,
      description,
      imageKey,
    } = req.body;

    /*
     * Validate category.
     */
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category is required.',
      });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service category.',
      });
    }

    /*
     * Service name is always required.
     */
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Service name is required.',
      });
    }

    /*
     * Description and image are completely optional.
     *
     * If not provided:
     * description -> null
     * imageKey    -> null
     */

    const service = await createService({
      category,
      name: name.trim(),
      description:
        typeof description === 'string' &&
        description.trim()
          ? description.trim()
          : null,
      imageKey: imageKey || null,
    });

    return res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: service,
    });
  } catch (error) {
    console.error(
      'Create service error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to create service.',
    });
  }
};

/*
 * =========================================================
 * PUT /api/services/:id
 * Update service
 *
 * name        -> REQUIRED
 * description -> OPTIONAL
 * image       -> OPTIONAL
 *
 * If description/image are omitted:
 * existing values are preserved.
 * =========================================================
 */

const updateServiceController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    /*
     * Find existing service first.
     */
    const existingService =
      await getServiceById(id);

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    const {
      category,
      name,
      description,
      imageKey,
    } = req.body;

    /*
     * Validate category.
     */
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category is required.',
      });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service category.',
      });
    }

    /*
     * Service name is always required.
     */
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Service name is required.',
      });
    }

    /*
     * =====================================================
     * DESCRIPTION HANDLING
     * =====================================================
     *
     * If description is NOT included in request:
     *     keep existing description.
     *
     * If description is provided with text:
     *     update description.
     *
     * If description is explicitly sent as "":
     *     clear description by setting it to null.
     */

    let updatedDescription =
      existingService.description;

    if (
      Object.prototype.hasOwnProperty.call(
        req.body,
        'description'
      )
    ) {
      updatedDescription =
        typeof description === 'string' &&
        description.trim()
          ? description.trim()
          : null;
    }

    /*
     * =====================================================
     * IMAGE HANDLING
     * =====================================================
     *
     * If imageKey is NOT included:
     *     keep existing image.
     *
     * If a new imageKey is provided:
     *     replace existing image.
     *
     * If imageKey is explicitly null:
     *     remove image reference from database.
     *
     * NOTE:
     * The actual old R2 image deletion should happen
     * only when replacing/removing an image.
     */

    let updatedImageKey =
      existingService.imageKey;

    if (
      Object.prototype.hasOwnProperty.call(
        req.body,
        'imageKey'
      )
    ) {
      updatedImageKey =
        imageKey || null;
    }

    /*
     * Update database record.
     */
    const service =
      await updateService(
        id,
        {
          category,
          name: name.trim(),
          description: updatedDescription,
          imageKey: updatedImageKey,
        }
      );

    /*
     * =====================================================
     * DELETE OLD IMAGE FROM R2
     * =====================================================
     *
     * Only delete the old image when:
     *
     * 1. A different image was provided, OR
     * 2. The image was explicitly removed.
     *
     * Do NOT delete the image when imageKey was omitted.
     */

    if (
      existingService.imageKey &&
      existingService.imageKey !== updatedImageKey
    ) {
      try {
        await deleteServiceImage(
          existingService.imageKey
        );
      } catch (imageDeleteError) {
        /*
         * Database update already succeeded.
         * Log R2 deletion failure instead of
         * failing the entire update.
         */
        console.error(
          'Failed to delete old service image:',
          imageDeleteError
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    });
  } catch (error) {
    console.error(
      'Update service error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to update service.',
    });
  }
};

/*
 * =========================================================
 * DELETE /api/services/:id
 * Delete service
 * =========================================================
 */

const deleteServiceController = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    /*
     * Find service first so we can get
     * the associated R2 image.
     */
    const existingService =
      await getServiceById(id);

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    /*
     * Delete image from Cloudflare R2
     * if the service has an image.
     */
    if (existingService.imageKey) {
      try {
        await deleteServiceImage(
          existingService.imageKey
        );
      } catch (imageDeleteError) {
        console.error(
          'Failed to delete service image:',
          imageDeleteError
        );

        return res.status(500).json({
          success: false,
          message:
            'Failed to delete service image.',
        });
      }
    }

    /*
     * Delete database record.
     */
    await deleteService(id);

    return res.status(200).json({
      success: true,
      message:
        'Service and associated image deleted successfully.',
    });
  } catch (error) {
    console.error(
      'Delete service error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to delete service.',
    });
  }
};

/*
 * =========================================================
 * EXPORTS
 * =========================================================
 */

module.exports = {
  getAllServicesController,
  getServicesByCategoryController,
  getServiceByIdController,
  createServiceController,
  updateServiceController,
  deleteServiceController,
};

