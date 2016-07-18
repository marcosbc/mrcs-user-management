'use strict';
var User = require('../models/user');
function validationErrorResponse (res, errors) {
  res.status(400);
  res.json(res.app.get('utils').http.getHttpError(400, errors));
}
function errorResponse (res, errors) {
  res.status(500);
  res.json(res.app.get('utils').http.getHttpError(500, errors));
}
module.exports = {
  get: (req, res, next) => {
    User.find({}, (err, data) => {
      if (err) {
        console.error(err);
        errorResponse(res);
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  post: (req, res, next) => {
    var securityUtils = req.app.get('userUtils').security;
    var saltRounds = req.app.get('config').security.saltRounds;
    var newUser;
    var validationErrors;
    var hashedPassword;
    req.checkBody('username', 'Invalid username').isValidUsername();
    req.checkBody('password', 'Invalid password').isValidPassword();
    req.checkBody('email', 'Invalid e-mail').isValidEmail();
    req.checkBody('fullName', 'Invalid full name').isValidFullName();
    validationErrors = req.validationErrors();
    if (validationErrors) {
      validationErrorResponse(res, validationErrors);
      return;
    }
    hashedPassword = securityUtils.generateHash(req.body.password, saltRounds);
    newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      fullName: req.body.fullName
    });
    newUser.save((err, data) => {
      if (err) {
        console.error(err);
        errorResponse(res, err);
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  show: (req, res, next) => {
    var validationErrors;
    req.checkParams('id', 'Invalid user identifier').isValidIdentifier();
    validationErrors = req.validationErrors();
    if (validationErrors) {
      validationErrorResponse(res, validationErrors);
      return;
    }
    User.findOne({
      '_id': req.params.id
    }, (err, data) => {
      if (err) {
        console.error(err);
        errorResponse(res, err);
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  edit: (req, res, next) => {
    var securityUtils = req.app.get('userUtils').security;
    var saltRounds = req.app.get('config').security.saltRounds;
    var newUser;
    var validationErrors;
    var hashedPassword;
    req.checkParams('id', 'Invalid user identifier').isValidIdentifier();
    req.checkBody('username', 'Invalid username').isValidUsername();
    req.checkBody('password', 'Invalid password').isValidPassword();
    req.checkBody('email', 'Invalid e-mail').isValidEmail();
    req.checkBody('fullName', 'Invalid full name').isValidFullName();
    validationErrors = req.validationErrors();
    if (validationErrors) {
      validationErrorResponse(res, validationErrors);
      return;
    }
    hashedPassword = securityUtils.generateHash(req.body.password, saltRounds);
    User.findOneAndUpdate({
      '_id': req.params.id
    }, {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      fullName: req.body.fullName
    }, {
      // Return the updated doc
      new: true
    }, function (err, data) {
      if (err) {
        console.error(err);
        errorResponse(res, err);
      } else {
        if (data.length === 0) {
          data = {};
        }
        res.json(data);
      }
    });
  },
  delete: (req, res, next) => {
    var validationErrors;
    req.checkParams('id', 'Invalid user identifier').isValidIdentifier();
    validationErrors = req.validationErrors();
    if (validationErrors) {
      validationErrorResponse(res, validationErrors);
      return;
    }
    User.remove({
      '_id': req.params.id
    }, (err, data) => {
      if (err) {
        console.error(err);
        errorResponse(res, err);
      } else {
        // The entry does not exist anymore
        res.json({});
      }
    });
  }
};
