// Load Module Dependencies
var recommendationDal = require('../dal/recommendation');
var debug = require('debug')('recommendations controller');
var patientDal = require('../dal/patient');
var symptomDal = require('../dal/symptom');
var remedyDal = require('../dal/remedy');
var historyDal=require('../dal/history');
/**
 * post recommendation
 */
exports.createrecommendation = function createrecommendation(req, res, next) {
  debug('creating recommendation');

  var body = req.body;
  req.checkBody('patient._id', 'patient id is empty')
    .notEmpty();
  req.checkBody('symptom._id', 'symptom id is empty')
    .notEmpty();
  req.checkBody('remedy._id', 'remedy id is empty')
    .notEmpty();

  recommendationDal.create({
    patient: body.patient._id,
    remedy: body.remedy._id,
    symptom: body.symptom._id
  },
    function cb(err, recommendation) {
      if (err) {
        return next(err);
      }
      historyDal.update({ _id: recommendation._id },function updatecb(err, history) {
        if (err) {
          return next(err);
        }

        res.status(201);
        res.json(recommendation);
      });
    });
};

// /**
//  * Get recommendation
//  */
// exports.getrecommendation = function getrecommendation(req, res, next) {
//   debug('getting a recommendation:',req.params._id);

// var recommendationId=req.params.recommendationId;
//   recommendationDal.get(recommendationId, function cb(err, recommendation) {
//     if (err) {
//       return next(err);
//     }
//       if (recommendation) {
//       res.json(recommendation);

//     } else {
//       res.status(404);
//       res.json({
//         error: true,
//         message: 'recommendation Not Found!',
//         status: 404
//       });

//     }
//    });
// };


// /**
//  * Update a recommendation by id
//  */
// exports.updaterecommendation = function updaterecommendation(req, res, next) {
//   debug('updating recommendation:', req.params._id);

//   var body = req.body;
//   var _id =req.params._id;

//   recommendationDal.update({_id:recommendation._id},function cb(err, recommendation){
//     if(err){
//        return next(err);
//       }
//       if(!recommendation._id){
//         res.status(404);
//         res.json({
//           message:'recommendation not found'
//         });
//       }

//     res.json(recommendation);
//   });
// };



// /**
//  * Get recommendations
//  */
// exports.getrecommendations = function getrecommendations(req, res, next) {
//   debug('getting recommendations');

//   recommendationDal.getCollection({}, function getrecommendations(err, recommendations) {
//     if (err) {
//       return next(err);
//     }
//     res.json(recommendations);
//   }); 
// };

// /**
//  * delete recommendation
//  */
// exports.removerecommendation = function removerecommendation(req, res, next) {
//   debug('deletting a recommendation:', req.params._id);

//   var query = { _id: req.params._id };
//   recommendationDal.delete(query, function deletecb(err, recommendation) {
//     if (err) {
//       return next(err);
//     }
//     res.json(recommendation || {});
//   });
// };

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    message: 'To Implemented!'
  });
};