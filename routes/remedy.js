// Load Module Dependencies
var express   =   require('express');

var remedy  = require('../controllers/remedy');

// Create a Router
var router = express.Router();

// POST / remedys/signup
router.post('/create', remedy.createRemedy);

// //put /remedys/:remedyId
// router.put('/:_id',remedy.noop);

// //get /remedys/:remedyId
 router.get('/:_id',remedy.getremedy);

// //get /remedys/all
 router.get('/',remedy.getremedys);
// admin


// Export Router
module.exports = router;