import dotenv from 'dotenv';

// Get Process.env from .env file and brings it here
dotenv.config();

export default {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
