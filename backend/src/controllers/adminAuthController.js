const {
  createAdminUser,
  loginAdmin,
} = require('../services/adminAuthService');

const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    const admin = await createAdminUser(
      email.trim().toLowerCase(),
      password
    );

    return res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: admin,
    });
  } catch (error) {
    console.error(
      'Admin registration error:',
      error
    );

    if (
      error.message ===
      'Admin user already exists'
    ) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to create admin user',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const result = await loginAdmin(
      email.trim().toLowerCase(),
      password
    );

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      data: result,
    });
  } catch (error) {
    console.error(
      'Admin login error:',
      error.message
    );

    if (
      error.message ===
      'Invalid email or password'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Admin login failed',
    });
  }
};

module.exports = {
  registerAdmin,
  login,
};