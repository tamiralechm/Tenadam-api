// Access Layer for history Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug = require('debug')('api:dal-history');
var moment = require('moment');

var history = require('../models/history');

var population = [{
  path: 'history'
}];

/**
 * create a new history.
 *
 * @desc  creates a new history and saves them
 *        in the database
 *
 * @param {Object}  historyData  Data for the history to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(historyData, cb) {
  debug('creating a new history');

  // Create history
  var historyModel = new history(historyData);

  historyModel.save(function savehistory(err, data) {
    if (err) {
      return cb(err);
    }
  });
};

//     /*/get history by id
//     exports.get({ _id: data._id }, function (err, history) {
//       debug('get history');
//       if (err) {
//         return cb(err);
//       }

//       cb(null, history);

//     });

//   });

// };

// /**
//  * delete a history
//  *
//  * @desc  delete data of the history with the given
//  *        id
//  *
//  * @param {Object}  query   Query Object
//  * @param {Function} cb Callback for once delete is complete
//  */

// //deleting a history
// exports.delete = function deleteItem(query, cb) {
//   debug('deleting history: ', query);

//   history
//     .findOne(query)
//     .populate(population)
//     .exec(function deletehistory(err, history) {
//       if (err) {
//         return cb(err);
//       }

//       if (!history) {
//         return cb(null, {});
//       };

//       history.remove(function (err) {
//         if (err) {
//           return cb(err);
//         }

//         cb(null, history);

//       });

//     });
// };

// /**
//  * update a history
//  *
//  * @desc  update data of the history with the given
//  *        id
//  *
//  * @param {Object} query Query object
//  * @param {Object} updates  Update data
//  * @param {Function} cb Callback for once update is complete
//  */
// exports.update = function update(query, updates, cb) {
//   debug('updating history: ', query);

   
//   history
//     .findOneAndUpdate(query, updates)
//     .populate(population)
//     .exec(function updatecb(err, history) {
//       if (err) {
//         return cb(err);
//       }
//       cb(null, history || {});
//     });
// };

// /**
//  * get a history.
//  *
//  * @desc get a history with the given id from db
//  *
//  * @param {Object} query Query Object
//  * @param {Function} cb Callback for once fetch is complete
//  */
// exports.get = function get(query, cb) {
//   debug('getting history ', query);

//   history
//     .findOne(query)
//     .populate(population)
//     .exec(function (err, history) {
//       if (err) {
//         return cb(err);
//       }

//       cb(null, history || {});
//     });
// };

// /**
//  * get a collection of historys
//  *
//  * @desc get a collection of historys from db
//  *
//  * @param {Object} query Query Object
//  * @param {Function} cb Callback for once fetch is complete
//  */
// exports.getCollection = function getCollection(query, cb) {
//   debug('fetching a collection of historys');

//   history.find(query)
//     .populate(population)
//     .exec(function gethistorysCollection(err, historys) {
//       if (err) {
//         return cb(err);
//       }

//       return cb(null, historys);
//     });

// };