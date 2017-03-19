// Load Module Dependencies
var express = require('express');

var patient = require('../controllers/patient');
var auth  = require('../controllers/auth');
var authorize = require('../lib/authorize');

// Create a Router
var router = express.Router();

//post patients/:patientId
 
//post patiens/:patientId 
 
// //post patients/:patientId
// router.put('/:_id', patient.updatepatient);

// // GET /patients/:patientId
// router.get('/:_id', patient.getpatient);

// // DELETE /patients/:patientId
// router.delete('/:_id', patient.removepatient);

// // GET /patients/all
// router.get('/all',patient.getpatients);


// Export Router
module.exports = router;