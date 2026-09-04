const teamService = require('../services/teamService');
const {
  getTeamImageUrl,
  deleteTeamImage,
} = require('../services/teamImageService');

const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await teamService.getAllTeamMembers();

    const teamMembersWithImages = await Promise.all(
      teamMembers.map(async (teamMember) => {
        const imageUrl = await getTeamImageUrl(
          teamMember.imageKey
        );

        return {
          id: teamMember.id,
          name: teamMember.name,
          designation: teamMember.designation,
          about: teamMember.about,
          imageUrl,
          createdAt: teamMember.createdAt,
          updatedAt: teamMember.updatedAt,
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: teamMembersWithImages,
    });
  } catch (error) {
    console.error('Get team members error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch team members',
    });
  }
};

const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const teamMember = await teamService.getTeamMemberById(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    const imageUrl = await getTeamImageUrl(
      teamMember.imageKey
    );

    return res.status(200).json({
      success: true,
      data: {
        id: teamMember.id,
        name: teamMember.name,
        designation: teamMember.designation,
        about: teamMember.about,
        imageUrl,
        createdAt: teamMember.createdAt,
        updatedAt: teamMember.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get team member error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch team member',
    });
  }
};

const createTeamMember = async (req, res) => {
  try {
    const {
      name,
      designation,
      about,
      imageKey,
    } = req.body;

    if (!name || !designation || !about || !imageKey) {
      return res.status(400).json({
        success: false,
        message: 'Name, designation, about and imageKey are required',
      });
    }

    const teamMember = await teamService.createTeamMember({
      name,
      designation,
      about,
      imageKey,
    });

    return res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: teamMember,
    });
  } catch (error) {
    console.error('Create team member error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to create team member',
    });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      designation,
      about,
      imageKey,
    } = req.body;

    if (!name || !designation || !about || !imageKey) {
      return res.status(400).json({
        success: false,
        message: 'Name, designation, about and imageKey are required',
      });
    }

    const existingTeamMember =
      await teamService.getTeamMemberById(id);

    if (!existingTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    const teamMember = await teamService.updateTeamMember(id, {
      name,
      designation,
      about,
      imageKey,
    });

    return res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: teamMember,
    });
  } catch (error) {
    console.error('Update team member error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update team member',
    });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    // Get team member first
    const teamMember = await teamService.getTeamMemberById(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    // Delete image from Cloudflare R2
    if (teamMember.imageKey) {
      await deleteTeamImage(teamMember.imageKey);
    }

    // Delete team member from database
    await teamService.deleteTeamMember(id);

    return res.status(200).json({
      success: true,
      message: 'Team member deleted successfully',
    });
  } catch (error) {
    console.error(
      'Delete team member error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to delete team member',
    });
  }
};

const getAdminTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const teamMember = await teamService.getTeamMemberById(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    const imageUrl = await getTeamImageUrl(
      teamMember.imageKey
    );

    return res.status(200).json({
      success: true,
      data: {
        id: teamMember.id,
        name: teamMember.name,
        designation: teamMember.designation,
        about: teamMember.about,

        // Admin can use this when editing
        imageKey: teamMember.imageKey,

        // Signed URL for preview
        imageUrl,

        createdAt: teamMember.createdAt,
        updatedAt: teamMember.updatedAt,
      },
    });
  } catch (error) {
    console.error(
      'Get admin team member error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch team member',
    });
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getAdminTeamMemberById,
};