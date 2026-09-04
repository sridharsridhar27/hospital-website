const app = require('./app');
const env = require('./config/env');
const prisma = require('./config/prisma');
const testR2Connection = require('./utils/testR2');

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log('Database connected successfully');

    await testR2Connection();

    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();