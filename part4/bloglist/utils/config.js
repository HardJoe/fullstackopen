require('dotenv').config();

switch (process.env.NODE_ENV) {
  case 'production':
    MONGODB_URI = process.env.MONGODB_URI;
    break;
  case 'test':
    MONGODB_URI = process.env.TEST_MONGODB_URI;
    break;
  default:
    MONGODB_URI = process.env.DEV_MONGODB_URI;
}

const PORT = process.env.PORT;

module.exports = {
  MONGODB_URI,
  PORT,
};
