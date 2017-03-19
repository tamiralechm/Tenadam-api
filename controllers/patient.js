// Load Module Dependencies
var patientDal = require('../dal/patient');
var debug=require('debug')('patients controller');

// /**
//  * post patient
//  */
// exports.createpatient = function createpatient(req, res, next) {
//   debug('creating patient');

//   var body = req.body;
//    req.checkBody('first_name', 'first_Name is empty!')
//       .notEmpty();
// req.checkBody('last_name', 'last_Name is empty!')
//       .notEmpty()
//      req.checkBody('email','email is empty')
//      .notEmpty();
//   req.checkBody('recommendation._id','recommendation id is empty')
//      .notEmpty();
//      req.checkBody('symptom._id','symptom id is empty')
//      .notEmpty();


//   patientDal.create({
//     first_name: body.first_name,
//     last_name: body.last_name,
//      email:body.email,
//     recommendation: body.recommendation._id,
//     symptom:body.symptom._id
//   },
//     function cb(err, patient) {
//       if (err) {
//         return next(err);
//       }
//       patientDal.update({ _id: patient._id },{recommendation: body.recommendation._id,
// },{symptom:body.symptom._id},function updatecb(err, patient) {
//         if (err) {
//           return next(err);
//         }

//         res.status(201);
//         res.json(patient);
//       });
//     });
// };

/**
 * Get patient
 */
exports.getpatient = function getpatient(req, res, next) {
  debug('getting a patient:',req.params._id);

var patientId=req.params.patientId;
  patientDal.get(patientId, function cb(err, patient) {
    if (err) {
      return next(err);
    }
      if (patient) {
      res.json(patient);

    } else {
      res.status(404);
      res.json({
        error: true,
        message: 'patient Not Found!',
        status: 404
      });

    }
   });
};


// /**
//  * Update a patient by id
//  */
// exports.updatepatient = function updatepatient(req, res, next) {
//   debug('updating patient:', req.params._id);

//   var body = req.body;
//   var _id =req.params._id;

//   patientDal.update({_id:patient._id},function cb(err, patient){
//     if(err){
//        return next(err);
//       }
//       if(!patient._id){
//         res.status(404);
//         res.json({
//           message:'patient not found'
//         });
//       }

//     res.json(patient);
//   });
// };



// /**
//  * Get patients
//  */
// exports.getpatients = function getpatients(req, res, next) {
//   debug('getting patients');
  
//   patientDal.getCollection({}, function getpatients(err, patients) {
//     if (err) {
//       return next(err);
//     }
//     res.json(patients);
//   }); 
// };

// /**
//  * delete patient
//  */
// exports.removepatient = function removepatient(req, res, next) {
//   debug('deletting a patient:', req.params._id);

//   var query = { _id: req.params._id };
//   patientDal.delete(query, function deletecb(err, patient) {
//     if (err) {
//       return next(err);
//     }
//     res.json(patient || {});
//   });
// };

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    message: 'To Implemented!'
  });
};