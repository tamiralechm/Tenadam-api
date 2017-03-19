// Load Module Dependencies
var express = require('express');

var profile = require('../controllers/profile');
 // Create a Router
var router = express.Router();

//router.post('/',profile.createProfile);


// //GET profiles/profileId
// router.get('/:_id', profile.noop);

// //PUT profiles/profileId
// router.put('/:_id', profile.noop);

// //GET profiles/all
// router.get('/all', profile.noop);

// //delete profiles/profileId
// router.delete('/:_id', profile.noop);



// Export Router
module.exports = router;

