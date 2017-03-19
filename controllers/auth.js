// Load Module Dependencies
var events = require('events');
var crypto = require('crypto');

var debug = require('debug')('check-on-me-api');
var moment = require('moment');

var config = require('../config');

var UserDal = require('../dal/user');
var TokenDal = require('../dal/token');

// Login Controller
exports.login = function login(req, res, next) {
  debug('Login User');

  var workflow = new events.EventEmitter();

  workflow.on('validateData', function validateData() {
    req.checkBody('email', 'email is empty!')
      .notEmpty();
    req.checkBody('password', 'Password is empty!')
      .notEmpty();
    var errs = req.validationErrors();
    if (errs) {
      res.status(400);
      res.json(errs);
      return;
    }

    workflow.emit('validateEmail');

  });

  workflow.on('validateEmail', function validateEmail() {
     // Check Username
    UserDal.get({ email: req.body.email }, function done(err, email) {
      if (err) {
        return next(err);
      }

      if (!email) {
        res.status(404);
        res.json({
          message: 'not recognized!'
        });
        return;
      }
      workflow.emit('validatePassword', email);
    });
  });

  workflow.on('validatePassword', function validatePassword(email) {
    // Check Password
    UserDal.get({ password: req.body.password }, function done(err, isOk) {
       if (err) {
        return next(err);
      }

      if (!isOk) {
        res.status(403);
        res.json({
          message: 'Wrong Credentials!'
        });
        return;
      }

      workflow.emit('generateToken', email);
    });
  });
 
  workflow.on('generateToken', function generateToken(email) {
 
    TokenDal.get({ email: req.body.email }, function done(err, token) {
      if (err) {
        return next(err);
      }

      crypto.randomBytes(config.TOKEN_LENGTH, function tokenGenerator(err, buf) {
        if (err) {
          return next(err);
        }

        var tokenValue = buf.toString('base64');

        // Generate a new token
        if (!token._id) {
          TokenDal.create({ email: email._id, value: tokenValue, revoked: false }, function createToken(err, token) {
            if (err) {
              return next(err);
            }

            workflow.emit('respond', email, tokenValue);
          });

        } else {
          // Update value
          TokenDal.update({ _id: token._id }, { $set: { value: tokenValue, revoked: false } }, function updateToken(err, token) {
            if (err) {
              return next(err);
            }

            workflow.emit('respond', email, tokenValue);

          });
        }
      });

    });

  });
   workflow.on('respond', function respond(user, token) {

     var now = moment().toISOString();
    UserDal.update({ email: req.body.email },{last_login:now}, function updateLogin(err, user) {
      if (err) {
        return next(err);
      }

      user = user.toJSON();

      delete user.password;

      res.json({
        token: token,
        user: user
      });
    });
  });
  workflow.emit('validateData');
};
// Logout Controller
exports.logout = function logout(req, res, next) {
  debug('Logout controller');
};
// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    message: 'To Implemented!'
  });
};
