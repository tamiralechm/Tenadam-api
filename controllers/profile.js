// Load Module Dependencies
var profileDal = require('../dal/profile');
var debug=require('debug')('profiles controller');
var UserDal=require('../dal/user');
 
/**
 * Get profile
 */
exports.getprofile = function getprofile(req, res, next) {
  debug('getting a profile:',req.params._id);

var profileId=req.params.profileId;
  profileDal.get(profileId, function cb(err, profile) {
    if (err) {
      return next(err);
    }
      if (profile) {
      res.json(profile);

    } else {
      res.status(404);
      res.json({
        error: true,
        message: 'profile Not Found!',
        status: 404
      });

    }
   });
};


/**
 * Update a profile by id
 */
exports.updateprofile = function updateprofile(req, res, next) {
  debug('updating profile:', req.params._id);

  var body = req.body;
  var _id =req.params._id;

  profileDal.update({_id:profile._id},function cb(err, profile){
    if(err){
       return next(err);
      }
      if(!profile._id){
        res.status(404);
        res.json({
          message:'profile not found'
        });
      }

    res.json(profile);
  });
};



/**
 * Get profiles
 */
exports.getprofiles = function getprofiles(req, res, next) {
  debug('getting profiles');
  
  profileDal.getCollection({}, function getprofiles(err, profiles) {
    if (err) {
      return next(err);
    }
    res.json(profiles);
  }); 
};

/**
 * delete profile
 */
exports.removeprofile = function removeprofile(req, res, next) {
  debug('deletting a profile:', req.params._id);

  var query = { _id: req.params._id };
  profileDal.delete(query, function deletecb(err, profile) {
    if (err) {
      return next(err);
    }
    res.json(profile || {});
  });
};

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    message: 'To Implemented!'
  });
};