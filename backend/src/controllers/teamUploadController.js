const { uploadTeamImage } = require('../services/teamUploadService');

const uploadTeamImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required',
      });
    }

    const imageKey = await uploadTeamImage(req.file);

    return res.status(201).json({
      success: true,
      message: 'Team image uploaded successfully',
      data: {
        imageKey,
      },
    });
  } catch (error) {
    console.error('Team image upload error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to upload team image',
    });
  }
};

module.exports = {
  uploadTeamImageController,
};