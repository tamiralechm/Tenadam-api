// Access Layer for symptom Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug = require('debug')('api:dal-symptom');
var moment = require('moment');

var symptom = require('../models/symptom');

var population = [{
  path: 'symptom'
}];

/**
 * create a new symptom.
 *
 * @desc  creates a new symptom and saves them
 *        in the database
 *
 * @param {Object}  symptomData  Data for the symptom to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(symptomData, cb) {
  debug('creating a new symptom');

  // Create symptom
  var symptomModel = new symptom(symptomData);

  symptomModel.save(function savesymptom(err, data) {
    if (err) {
      return cb(err);
    }
  });
};
//     /*/get symptom by id
//     exports.get({ _id: data._id }, function (err, symptom) {
//       debug('get symptom');
//       if (err) {
//         return cb(err);
//       }

//       cb(null, symptom);

//     });

//   });

// };

// /**
//  * delete a symptom
//  *
//  * @desc  delete data of the symptom with the given
//  *        id
//  *
//  * @param {Object}  query   Query Object
//  * @param {Function} cb Callback for once delete is complete
//  */

// //deleting a symptom
// exports.delete = function deleteItem(query, cb) {
//   debug('deleting symptom: ', query);

//   symptom
//     .findOne(query)
//     .populate(population)
//     .exec(function deletesymptom(err, symptom) {
//       if (err) {
//         return cb(err);
//       }

//       if (!symptom) {
//         return cb(null, {});
//       };

//       symptom.remove(function (err) {
//         if (err) {
//           return cb(err);
//         }

//         cb(null, symptom);

//       });

//     });
// };

// /**
//  * update a symptom
//  *
//  * @desc  update data of the symptom with the given
//  *        id
//  *
//  * @param {Object} query Query object
//  * @param {Object} updates  Update data
//  * @param {Function} cb Callback for once update is complete
//  */
// exports.update = function update(query, updates, cb) {
//   debug('updating symptom: ', query);

   
//   symptom
//     .findOneAndUpdate(query, updates)
//     .populate(population)
//     .exec(function updatecb(err, symptom) {
//       if (err) {
//         return cb(err);
//       }
//       cb(null, symptom || {});
//     });
// };

// /**
//  * get a symptom.
//  *
//  * @desc get a symptom with the given id from db
//  *
//  * @param {Object} query Query Object
//  * @param {Function} cb Callback for once fetch is complete
//  */
// exports.get = function get(query, cb) {
//   debug('getting symptom ', query);

//   symptom
//     .findOne(query)
//     .populate(population)
//     .exec(function (err, symptom) {
//       if (err) {
//         return cb(err);
//       }

//       cb(null, symptom || {});
//     });
// };

// /**
//  * get a collection of symptoms
//  *
//  * @desc get a collection of symptoms from db
//  *
//  * @param {Object} query Query Object
//  * @param {Function} cb Callback for once fetch is complete
//  */
// exports.getCollection = function getCollection(query, cb) {
//   debug('fetching a collection of symptoms');

//   symptom.find(query)
//     .populate(population)
//     .exec(function getsymptomsCollection(err, symptoms) {
//       if (err) {
//         return cb(err);
//       }

//       return cb(null, symptoms);
//     });

// };