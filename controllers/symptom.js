// Load Module Dependencies
var symptomDal = require('../dal/symptom');
var debug=require('debug')('symptoms controller');
var patientDal=require('../dal/patient');
var remedyDal=require('../dal/remedy');
var recommendationDal=require('../dal/recommendation');
var historyDal=require('../dal/history');
/**
 * post symptom
 */
exports.createsymptom = function createsymptom(req, res, next) {
  debug('creating symptom:',req.params._id);

var body = req.body;
 
    req.checkBody('name', 'Name is empty!')
      .notEmpty();
      req.checkBody('patient._id','patient id is empty')
     .notEmpty();
  req.checkBody('recommendation._id','recommendation id is empty')
     .notEmpty();
     req.checkBody('remedy._id','remedy id is empty')
     .notEmpty();

  symptomDal.create({
    name: body.name,
    patient: body.patient._id,
    recommendation: body.recommendation._id,
    remedy:remedy._id
  },
    function cb(err, symptom) {
      if (err) {
        return next(err);
      }
      historyDal.update({ _id: symptom._id },function updatecb(err, history) {
        if (err) {
          return next(err);
        }

        res.status(201);
        res.json(symptom);
      });
    });
};

// /**
//  * Get symptom
//  */
// exports.getsymptom = function getsymptom(req, res, next) {
//   debug('getting a symptom:',req.params._id);

// var symptomId=req.params.symptomId;
//   symptomDal.get(symptomId, function cb(err, symptom) {
//     if (err) {
//       return next(err);
//     }
//       if (symptom) {
//       res.json(symptom);

//     } else {
//       res.status(404);
//       res.json({
//         error: true,
//         message: 'symptom Not Found!',
//         status: 404
//       });

//    }
//   });
//  };


// /**
//  * Update a symptom by id
//  */
// exports.updatesymptom = function updatesymptom(req, res, next) {
//   debug('updating symptom:', req.params._id);

//   var body = req.body;
//   var _id =req.params._id;

//   symptomDal.update({_id:symptom._id},function cb(err, symptom){
//     if(err){
//        return next(err);
//       }
//       if(!symptom._id){
//         res.status(404);
//         res.json({
//           message:'symptom not found'
//         });
//       }

//     res.json(symptom);
//   });
// };



// /**
//  * Get symptoms
//  */
// exports.getsymptoms = function getsymptoms(req, res, next) {
//   debug('getting symptoms');
  
//   symptomDal.getCollection({}, function getsymptoms(err, symptoms) {
//     if (err) {
//       return next(err);
//     }
//     res.json(symptoms);
//   }); 
// };

// /**
//  * delete symptom
//  */
// exports.removesymptom = function removesymptom(req, res, next) {
//   debug('deletting a symptom:', req.params._id);

//   var query = { _id: req.params._id };
//   symptomDal.delete(query, function deletecb(err, symptom) {
//     if (err) {
//       return next(err);
//     }
//     res.json(symptom || {});
//   });
// };

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    message: 'To Implemented!'
  });
};