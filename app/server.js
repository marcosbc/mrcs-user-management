'use strict';
// Dependencies and variables
var path = require('path');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var waitForMongoose = require('wait-for-mongoose');
var microservice = require('microservice-skeleton');
var userUtils = require('./lib')();
var config;
var app;
// Try to load configuration file
try {
  config = require('./conf/configuration');
} catch (err) {
  console.error('Could not load conf/configuration.js!');
  process.exit(1);
}
// Express customizations and database init
microservice.registerHook('express', (expressInstance) => {
  app = expressInstance;
  app.set('config', config);
  app.set('userUtils', userUtils);
  app.use(expressValidator({
    customValidators: userUtils.validators.customValidators,
    customSanitizers: userUtils.validators.customSanitizers
  }));
  waitForMongoose(config.mongoDbUri, (err) => {
    if (err) {
      console.error('Timeout exceeded connecting to MongoDB');
      process.exit(1);
    }
    mongoose.connect(config.mongoDbUri);
    // This should ideally be done with Mongoose event handlers
    setInterval(() => {
      var dbConnected = mongoose.connection.readyState === 1;
      if (dbConnected) {
        app.set('ready', true);
      } else {
        app.set('ready', false);
      }
    }, 1000);
  });
});
microservice.registerHook('controllers', (registerDir) => {
  registerDir(path.join(__dirname, 'controllers'));
});
// Start the server
microservice.listen(config.port);
console.log('User management server - Listening on ' + app.get('utils').http.getFrontEndUrl(config.frontend));
