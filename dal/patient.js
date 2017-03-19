// Access Layer for patient Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug = require('debug')('tenadam-api');
var moment = require('moment');

var patient = require('../models/patient');

var population = [{
  path: 'profile'
}];

/**
 * create a new patient.
 *
 * @desc  creates a new patient and saves them
 *        in the database
 *
 * @param {Object}  patientData  Data for the patient to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(patientData, cb) {
  debug('creating a new patient');

  // Create patient
  var patientModel = new patient(patientData);

  patientModel.save(function savepatient(err, data) {
    if (err) {
      return cb(err);
    }
    cb(null, data);
  });
};
//     /*/get patient by id
//     exports.get({ _id: data._id }, function (err, patient) {
//       debug('get patient');
//       if (err) {
//         return cb(err);
//       }

//       cb(null, patient);

//     });

//   });

// };

// /**
//  * delete a patient
//  *
//  * @desc  delete data of the patient with the given
//  *        id
//  *
//  * @param {Object}  query   Query Object
//  * @param {Function} cb Callback for once delete is complete
//  *

// //deleting a patient
// exports.delete = function deleteItem(query, cb) {
//   debug('deleting patient: ', query);

//   patient
//     .findOne(query)
//     .populate(population)
//     .exec(function deletepatient(err, patient) {
//       if (err) {
//         return cb(err);
//       }

//       if (!patient) {
//         return cb(null, {});
//       };

//       patient.remove(function (err) {
//         if (err) {
//           return cb(err);
//         }

//         cb(null, patient);

//       });

//     });
// };

// /**
//  * update a patient
//  *
//  * @desc  update data of the patient with the given
//  *        id
//  *
//  * @param {Object} query Query object
//  * @param {Object} updates  Update data
//  * @param {Function} cb Callback for once update is complete
//  */
// exports.update = function update(query, updates, cb) {
//   debug('updating patient: ', query);

   
//   patient
//     .findOneAndUpdate(query, updates)
//     .populate(population)
//     .exec(function updatecb(err, patient) {
//       if (err) {
//         return cb(err);
//       }
//       cb(null, patient || {});
//     });
// };

// /**
//  * get a patient.
//  *
//  * @desc get a patient with the given id from db
//  *
//  * @param {Object} query Query Object
//  * @param {Function} cb Callback for once fetch is complete
//  */
// exports.get = function get(query, cb) {
//   debug('getting patient ', query);

//   patient
//     .findOne(query)
//     .populate(population)
//     .exec(function (err, patient) {
//       if (err) {
//         return cb(err);
//       }

//       cb(null, patient || {});
//     });
// };

// /**
//  * get a collection of patients
//  *
//  * @desc get a collection of patients from db
//  *
//  * @param {Object} query Query Object
//  * @param {Function} cb Callback for once fetch is complete
//  */
// exports.getCollection = function getCollection(query, cb) {
//   debug('fetching a collection of patients');

//   patient.find(query)
//     .populate(population)
//     .exec(function getpatientsCollection(err, patients) {
//       if (err) {
//         return cb(err);
//       }

//       return cb(null, patients);
//     });

// };