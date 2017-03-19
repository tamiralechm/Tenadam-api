// Access Layer for remedy Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug = require('debug')('tenadam-api');
var moment = require('moment');

var remedy = require('../models/remedy');

var population = [{
  path: 'remedy'
}];

/**
 * create a new remedy.
 *
 * @desc  creates a new remedy and saves them
 *        in the database
 *
 * @param {Object}  remedyData  Data for the remedy to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(remedyData, cb) {
  debug('creating a new remedy');

  // Create remedy
  var remedyModel = new remedy(remedyData);

  remedyModel.save(function saveremedy(err, data) {
    if (err) {
      return cb(err);
    }
    exports.get({ _id: data._id }, function (err, remedy) {
      debug('get remedy');
      if (err) {
        return cb(err);
      }
      cb(null, remedy);
    });
    return;
  });
};


//  * delete a remedy
//  *
//  * @desc  delete data of the remedy with the given
//  *        id
//  *
//  * @param {Object}  query   Query Object
//  * @param {Function} cb Callback for once delete is complete
//  */

// //deleting a remedy
// exports.delete = function deleteItem(query, cb) {
//   debug('deleting remedy: ', query);

//   remedy
//     .findOne(query)
//     .populate(population)
//     .exec(function deleteremedy(err, remedy) {
//       if (err) {
//         return cb(err);
//       }

//       if (!remedy) {
//         return cb(null, {});
//       };

//       remedy.remove(function (err) {
//         if (err) {
//           return cb(err);
//         }

//         cb(null, remedy);

//       });

//     });
// };

// /**
//  * update a remedy
//  *
//  * @desc  update data of the remedy with the given
//  *        id
//  *
//  * @param {Object} query Query object
//  * @param {Object} updates  Update data
//  * @param {Function} cb Callback for once update is complete
//  */
// exports.update = function update(query, updates, cb) {
//   debug('updating remedy: ', query);

   
//   remedy
//     .findOneAndUpdate(query, updates)
//     .populate(population)
//     .exec(function updatecb(err, remedy) {
//       if (err) {
//         return cb(err);
//       }
//       cb(null, remedy || {});
//     });
// };

/**
 * get a remedy.
 *
 * @desc get a remedy with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting remedy ', query);

  remedy
    .findOne(query)
    .populate(population)
    .exec(function (err, remedy) {
      if (err) {
        return cb(err);
      }

      cb(null, remedy || {});
    });
};

/**
 * get a collection of remedys
 *
 * @desc get a collection of remedys from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of remedys');

  remedy.find(query)
    .populate(population)
    .exec(function getremedysCollection(err, remedys) {
      if (err) {
        return cb(err);
      }

      return cb(null, remedys);
    });

};