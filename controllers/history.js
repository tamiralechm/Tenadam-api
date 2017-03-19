// Load Module Dependencies
var historyDal = require('../dal/history');
var debug=require('debug')('historys controller');

/**
 * post history
 */
exports.createhistory = function createhistory(req, res, next) {
  debug('creating history');

  var body = req.body;
   
      req.checkBody('patient._id','patient id is empty')
     .notEmpty();
  req.checkBody('recommendation._id','recommendation id is empty')
     .notEmpty();
     req.checkBody('remedy._id','remedy id is empty')
     .notEmpty();
     req.checkBody('remedy._id', 'remedy id is empty!')
      .notEmpty();

  historyDal.create({
    patient: body.patient._id,
    recommendation: body.recommendation._id,
    symptom:body.symptom._id,
    remedy:body.remedy._id
  },
    function cb(err, history) {
      if (err) {
        return next(err);
      }
      historyDal.update({ _id: history._id },{recommendation: body.recommendation._id,
},{symptom:body.symptom._id},function updatecb(err, history) {
        if (err) {
          return next(err);
        }

        res.status(201);
        res.json(history);
      });
    });
};

// /**
//  * Get history
//  */
// exports.gethistory = function gethistory(req, res, next) {
//   debug('getting a history:',req.params._id);

// var historyId=req.params.historyId;
//   historyDal.get(historyId, function cb(err, history) {
//     if (err) {
//       return next(err);
//     }
//       if (history) {
//       res.json(history);

//     } else {
//       res.status(404);
//       res.json({
//         error: true,
//         message: 'history Not Found!',
//         status: 404
//       });

//     }
//    });
// };


// /**
//  * Update a history by id
//  */
// exports.updatehistory = function updatehistory(req, res, next) {
//   debug('updating history:', req.params._id);

//   var body = req.body;
//   var _id =req.params._id;

//   historyDal.update({_id:history._id},function cb(err, history){
//     if(err){
//        return next(err);
//       }
//       if(!history._id){
//         res.status(404);
//         res.json({
//           message:'history not found'
//         });
//       }

//     res.json(history);
//   });
// };



// /**
//  * Get historys
//  */
// exports.gethistorys = function gethistorys(req, res, next) {
//   debug('getting historys');
  
//   historyDal.getCollection({}, function gethistorys(err, historys) {
//     if (err) {
//       return next(err);
//     }
//     res.json(historys);
//   }); 
// };

// /**
//  * delete history
//  */
// exports.removehistory = function removehistory(req, res, next) {
//   debug('deletting a history:', req.params._id);

//   var query = { _id: req.params._id };
//   historyDal.delete(query, function deletecb(err, history) {
//     if (err) {
//       return next(err);
//     }
//     res.json(history || {});
//   });
// };

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    message: 'To Implemented!'
  });
};