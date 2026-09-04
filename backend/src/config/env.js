require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not defined in .env'
  );
}

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,

  frontendUrl: process.env.FRONTEND_URL,
  adminUrl: process.env.ADMIN_URL,
};