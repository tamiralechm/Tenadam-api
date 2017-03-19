// Load Module Dependencies
var express   =   require('express');

var recommendation  = require('../controllers/recommendation');

// Create a Router
var router = express.Router();

// POST / recommendations/signup
router.post('/ ', recommendation.createrecommendation);

// //put /recommendations/:recommendationId
// router.put('/:_id',recommendation.noop);

// //get /recommendations/:recommendationId
// router.get('/_id',recommendation.noop);

// //get /recommendations/all
// router.get('/all',recommendation.noop);



// Export Router
module.exports = router;