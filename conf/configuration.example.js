// Rename this file to "config.js"
const config = {
  // Path where the API will be accessed from the browser
  base: '/',
  // Port which the API server will run on
  port: 4000,
  // Front-end settings, for obtaining URLs
  frontend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: 4000
  },
  // Security-related
  security: {
    secret: 'secret',
    saltRounds: 8
  },
  // MongoDB connection string
  mongoDbUri: 'mongodb://api:api@localhost:27017/api'
};
module.exports = config;
