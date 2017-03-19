// Load Module Dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var moment = require('moment');

var config = require('../config');

var Schema = mongoose.Schema;

//define user attributes
var UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  realm: { type: String, default: 'user' },
  role: { type: String, default: 'patient' },
  staus: { type: String, default: 'active' },
  Profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
  });


// Add a pre save hook
UserSchema.pre('save', function preSaveHook(next) {
  let model = this;

  bcrypt.genSalt(config.SALT_LENGTH, function genSalt(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(model.password, salt, function hashPasswd(err, hash) {
      if (err) {
        return next(err);
      }

      model.password = hash;
      next();

    });
  });

});

// Compare Passwords Method
UserSchema.methods.checkPassword = function checkPassword(password, cb) {
  bcrypt.compare(password, this.password, function done(err, res) {
    if (err) {
      return cb(err);
    }

    cb(null, res);
  });

};
// Export User Model
module.exports = mongoose.model('User', UserSchema);