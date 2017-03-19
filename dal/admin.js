// Access Layer for admin Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug = require('debug')('api:dal-admin');
var moment = require('moment');

var admin = require('../models/admin');

var population = [{
  path: 'profile'
}];

/**
 * create a new admin.
 *
 * @desc  creates a new admin and saves them
 *        in the database
 *
 * @param {Object}  adminData  Data for the admin to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(adminData, cb) {
  debug('creating a new admin');

  // Create admin
  var adminModel = new admin(adminData);

  adminModel.save(function saveadmin(err, data) {
    if (err) {
      return cb(err);
    }

    //get admin by id
    exports.get({ _id: data._id }, function (err, admin) {
      debug('get admin');
      if (err) {
        return cb(err);
      }

      cb(null, admin);

    });

  });

};

/**
 * delete a admin
 *
 * @desc  delete data of the admin with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */

//deleting a admin
exports.delete = function deleteItem(query, cb) {
  debug('deleting admin: ', query);

  admin
    .findOne(query)
    .populate(population)
    .exec(function deleteadmin(err, admin) {
      if (err) {
        return cb(err);
      }

      if (!admin) {
        return cb(null, {});
      };

      admin.remove(function (err) {
        if (err) {
          return cb(err);
        }

        cb(null, admin);

      });

    });
};

/**
 * update a admin
 *
 * @desc  update data of the admin with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
  debug('updating admin: ', query);

   
  admin
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updatecb(err, admin) {
      if (err) {
        return cb(err);
      }
      cb(null, admin || {});
    });
};

/**
 * get a admin.
 *
 * @desc get a admin with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting admin ', query);

  admin
    .findOne(query)
    .populate(population)
    .exec(function (err, admin) {
      if (err) {
        return cb(err);
      }

      cb(null, admin || {});
    });
};

/**
 * get a collection of admins
 *
 * @desc get a collection of admins from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of admins');

  admin.find(query)
    .populate(population)
    .exec(function getadminsCollection(err, admins) {
      if (err) {
        return cb(err);
      }

      return cb(null, admins);
    });

};