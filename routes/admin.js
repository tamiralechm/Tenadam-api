// Load Module Dependencies
var express   =   require('express');

var admin  = require('../controllers/admin');

// Create a Router
var router = express.Router();

// POST / admins/signup

// POST / admins/login

//put /admins/:adminId
router.put('/:_Id',admin.noop);

//get /admins/:adminId
router.get('/:_Id',admin.noop);

//get /admins/all
router.get('/all',admin.noop);



// Export Router
module.exports = router;