// Load Module Dependencies
var express   =   require('express');

var history  = require('../controllers/history');

// Create a Router
var router = express.Router();

// POST / historys/signup
router.post('/ ', history.createhistory);

// //put /historys/:historyId
// router.put('/:_Id',history.updatehistory);

// //get /historys/:historyId
// router.get('/:_Id',history.gethistory);

// //get /historys/all
// router.get('/all',history.gethistorys);



// Export Router
module.exports = router;