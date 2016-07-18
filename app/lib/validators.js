'use strict';
var validator = require('validator');
class ValidatorFunctions {
  get customValidators () {
    return {
      isValidIdentifier: (value) => {
        return validator.isMongoId(value);
      },
      isValidUsername: (value) => {
        return validator.isLength(value, {min: 1, max: 20}) &&
               validator.isAlphanumeric(value);
      },
      isValidPassword: (value) => {
        return validator.isLength(value, {min: 6, max: 20});
      },
      isValidEmail: (value) => {
        return validator.isEmail(value);
      },
      isValidFullName: (value) => {
        return validator.isLength(value, {min: 1, max: 20});
      }
    }
  }
  get customSanitizers () {
    // No sanitizers for the moment
    return {};
  }
}
// Export the previously created class
module.exports = () => {
  return new ValidatorFunctions();
};
