// Load Module Dependencies
var adminDal = require('../dal/admin');
var debug=require('debug')('admins controller');
var UserDal=require('../dal/user');
 
// /**
//  * Get admin
//  */
// exports.getadmin = function getadmin(req, res, next) {
//   debug('getting a admin:',req.params._id);

// var adminId=req.params.adminId;
//   adminDal.get(adminId, function cb(err, admin) {
//     if (err) {
//       return next(err);
//     }
//       if (admin) {
//       res.json(admin);

//     } else {
//       res.status(404);
//       res.json({
//         error: true,
//         message: 'admin Not Found!',
//         status: 404
//       });

//     }
//    });
// };


// /**
//  * Update a admin by id
//  */
// exports.updateadmin = function updateadmin(req, res, next) {
//   debug('updating admin:', req.params._id);

//   var body = req.body;
//   var _id =req.params._id;

//   adminDal.update({_id:admin._id},function cb(err, admin){
//     if(err){
//        return next(err);
//       }
//       if(!admin._id){
//         res.status(404);
//         res.json({
//           message:'admin not found'
//         });
//       }

//     res.json(admin);
//   });
// };



// /**
//  * Get admins
//  */
// exports.getadmins = function getadmins(req, res, next) {
//   debug('getting admins');
  
//   adminDal.getCollection({}, function getadmins(err, admins) {
//     if (err) {
//       return next(err);
//     }
//     res.json(admins);
//   }); 
// };

// /**
//  * delete admin
//  */
// exports.removeadmin = function removeadmin(req, res, next) {
//   debug('deletting a admin:', req.params._id);

//   var query = { _id: req.params._id };
//   adminDal.delete(query, function deletecb(err, admin) {
//     if (err) {
//       return next(err);
//     }
//     res.json(admin || {});
//   });
// };

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    message: 'To Implemented!'
  });
};