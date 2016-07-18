'use strict';
// Export library of functions
module.exports = () => {
  return {
    security: require('./security')(),
    validators: require('./validators')()
  };
};
