// Access Layer for recommendation Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug = require('debug')('api:dal-recommendation');
var moment = require('moment');

var recommendation = require('../models/recommendation');

var population = [{
  path: 'recommendation'
}];

/**
 * create a new recommendation.
 *
 * @desc  creates a new recommendation and saves them
 *        in the database
 *
 * @param {Object}  recommendationData  Data for the recommendation to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(recommendationData, cb) {
  debug('creating a new recommendation');

  // Create recommendation
  var recommendationModel = new recommendation(recommendationData);

  recommendationModel.save(function saverecommendation(err, data) {
    if (err) {
      return cb(err);
    }
  });
};

//     /*/get recommendation by id
//     exports.get({ _id: data._id }, function (err, recommendation) {
//       debug('get recommendation');
//       if (err) {
//         return cb(err);
//       }

//       cb(null, recommendation);

//     });

//   });

// };

// /**
//  * delete a recommendation
//  *
//  * @desc  delete data of the recommendation with the given
//  *        id
//  *
//  * @param {Object}  query   Query Object
//  * @param {Function} cb Callback for once delete is complete
//  */

// //deleting a recommendation
// exports.delete = function deleteItem(query, cb) {
//   debug('deleting recommendation: ', query);

//   recommendation
//     .findOne(query)
//     .populate(population)
//     .exec(function deleterecommendation(err, recommendation) {
//       if (err) {
//         return cb(err);
//       }

//       if (!recommendation) {
//         return cb(null, {});
//       };

//       recommendation.remove(function (err) {
//         if (err) {
//           return cb(err);
//         }

//         cb(null, recommendation);

//       });

//     });
// };

// /**
//  * update a recommendation
//  *
//  * @desc  update data of the recommendation with the given
//  *        id
//  *
//  * @param {Object} query Query object
//  * @param {Object} updates  Update data
//  * @param {Function} cb Callback for once update is complete
//  */
// exports.update = function update(query, updates, cb) {
//   debug('updating recommendation: ', query);

   
//   recommendation
//     .findOneAndUpdate(query, updates)
//     .populate(population)
//     .exec(function updatecb(err, recommendation) {
//       if (err) {
//         return cb(err);
//       }
//       cb(null, recommendation || {});
//     });
// };

// /**
//  * get a recommendation.
//  *
//  * @desc get a recommendation with the given id from db
//  *
//  * @param {Object} query Query Object
//  * @param {Function} cb Callback for once fetch is complete
//  */
// exports.get = function get(query, cb) {
//   debug('getting recommendation ', query);

//   recommendation
//     .findOne(query)
//     .populate(population)
//     .exec(function (err, recommendation) {
//       if (err) {
//         return cb(err);
//       }

//       cb(null, recommendation || {});
//     });
// };

// /**
//  * get a collection of recommendations
//  *
//  * @desc get a collection of recommendations from db
//  *
//  * @param {Object} query Query Object
//  * @param {Function} cb Callback for once fetch is complete
//  */
// exports.getCollection = function getCollection(query, cb) {
//   debug('fetching a collection of recommendations');

//   recommendation.find(query)
//     .populate(population)
//     .exec(function getrecommendationsCollection(err, recommendations) {
//       if (err) {
//         return cb(err);
//       }

//       return cb(null, recommendations);
//     });

// };