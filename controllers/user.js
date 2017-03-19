// Load Module Dependencies
var events = require('events');

var debug = require('debug')('tenadam-api');
var moment = require('moment');

var UserDal = require('../dal/user');
var ProfileDal = require('../dal/profile');
var patientDal = require('../dal/patient');
var AdminDal = require('../dal/admin');


/**
 * Create User
 *
 * 1. Validate Data
 * 2. Create User
 * 3. Create Profile
 * 4. Create UserType
 * 5. Response
 */
exports.createUser = function createUser(req, res, next) {
  debug('creating user');

  var workflow = new events.EventEmitter();
  var body = req.body;


  workflow.on('validateUser', function validateUser() {

    debug('validate user');
    // Validate User Data
    req.checkBody('password', 'Password Invalid!')
      .notEmpty()
      .isLength(6);
    req.checkBody('email', 'Email Invalid!')
      .notEmpty()
      .isEmail();
    req.checkBody('first_name', 'First Name is empty!')
      .notEmpty();
    req.checkBody('last_name', 'Last Name is Empty!')
      .notEmpty();
    req.checkBody('user_type', 'User Type is Invalid!')
      .notEmpty().withMessage('User Type is Empty')
      .isIn(['patient', 'admin']).withMessage('User Type should either be patient or admin');

    var validationErrors = req.validationErrors();

    if (validationErrors) {
      res.status(400);
      res.json(validationErrors);

    } else {
      workflow.emit('createUser');

    }


  });

  workflow.on('createUser', function createUser() {
    debug('create user...')
    //var userID = Number(req.params.userID);
    // Create User
    UserDal.create({
      email: body.email,
      password: body.password,
      role: body.user_type,
      realm: body.realm ? body.realm : 'user'

    }, function callback(err, user) {
      if (err) {
        return next(err);
      }
      workflow.emit('createProfile', user);

    });


  });

  workflow.on('createProfile', function createProfile(user) {
    debug('create profile...')
    // Create Profile
    ProfileDal.create({
      user: user._id,
      first_name: body.first_name,
      last_name: body.last_name,
      // email: body.email
    },
      function callback(err, profile) {
        if (err) {
          return next(err);
        }

        UserDal.update({ _id: user._id }, { profile: profile._id }, function callback2(err, user) {
          if (err) {
            return next(err);
          }

          workflow.emit('createUserType', user, profile);

        });


      });


  });


  workflow.on('createUserType', function createUserType(user, profile) {
    debug('create user type..')

    // Create User Type

    if (body.user_type === 'patient') {
      
      patientDal.create({
        profile: profile._id,
      }, function callback1(err, patient) {
        if (err) {
          return next(err);
        }
       
        ProfileDal.update({ _id: profile._id }, { $set: { patient: patient._id } }, function updateCb1(err, profile) {

          if (err) {
            return next(err);
          }
          workflow.emit('respond', user);
        });

      });

    }
     else if (body.user_type === 'admin') {
       AdminDal.create({
        profile: profile._id
      }, function callback2(err, admin) {
        if (err) {
          return next(err);
        }  


        ProfileDal.update({ _id: profile._id }, { $set: { admin: admin._id } }, function updateCb2(err, profile) {
          if (err) {
            return next(err);
          }
          workflow.emit('respond', user);
        });
      });
    };
  });

  workflow.on('respond', function respond(user) {
    debug('respond')
    user = user.toJSON();

    delete user.password;

    res.status(201);
    res.json(user);

  });

  workflow.emit('validateUser');
};


/**
 * Get User
 */
exports.getUser = function getUser(req, res, next) {
  debug('getting a user');
  var userId = req.params.userId;

  UserDal.get(userId, function cb(err, user) {
    if (err) {
      return next(err);
    }

    // If user found return it
    if (user) {
      res.json(user);

    } else {
      res.status(404);
      res.json({
        error: true,
        message: 'user Not Found!',
        status: 404
      });

    }
  });

};


/**
 * Update User
 */
exports.updateUser = function updateUser(req, res, next) {
  debug('updating user:', req.params._id);

  var body = req.body;
  var query = { _id: req.params._id };

  UserDal.update(query, body, function cb(err, user) {
    if (err) { return next(err); }

    res.json(user);
  });
};


/**
 * Remove Users
 */
exports.removeUser = function removeUser(req, res, next) {
  debug('delete user:', req.params._id);

  var query = { _id: req.params._id };
  UserDal.delete(query, function deletecb(err, user) {
    if (err) {
      return next(err);
    }
    res.json(user || {});
  });

};


/**
 * Get Users
 */
exports.getUsers = function getUsers(req, res, next) {
  debug('get multiple users');

  UserDal.getCollection({}, function getUsers(err, users) {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
};


// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    message: 'To Implemented!'
  });
};

