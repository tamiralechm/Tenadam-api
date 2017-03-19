// Load Module Dependencies
var express   =   require('express');

var symptom  = require('../controllers/symptom');

// Create a Router
var router = express.Router();

// POST / symptoms/signup
router.post('/ ', symptom.createsymptom);

// //put /symptoms/:symptomId
// router.put('/:_id',symptom.noop);

// //get /symptoms/:symptomId
// router.get('/:_id',symptom.noop);

// //get /symptoms/all
// router.get('/all',symptom.noop);
// admin


// Export Router
module.exports = router;