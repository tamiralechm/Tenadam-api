// Load Module Dependencies
var express = require('express');

var user = require('../controllers/user');
var auth = require('../controllers/auth');
// var authorize = require('../lib/authorize');

// Create a Router
var router = express.Router();

/**
 * @api {post} /users/signup Signup User
 * @apiName CreateUser
 * @apiGroup User
 *

 * @apiParam {String} first_name  First Name
 * @apiParam {String} last_name Last Name
 * @apiParam {String} email Email Address
 * @apiParam {String} password User Password
 * @apiParam {String} user_type User Type - admin or customer
 *
 * @apiParamExample Request Example:
 *  {
 *    "first_name": "tamri",
 *    "last_name": "mesfin",
 *    "email": "tamri@gmail.com",
 *    "password": "123456",
 *    "user_type": "admin"
 *  }
 *
 * @apiSuccess {String} _id Unique User ID
 * @apiSuccess {String} updated_at Last Modified Date
 * @apiSuccess {String} date_created Date Created
 * @apiSuccess {String} email user Email Address
 * @apiSuccess {String} status the status of the user
 * @apiSuccess {String} role User Role
 * @apiSuccess {String} realm User Realm/Group
 *
 * @apiSuccessExample Response Example:
 *  {
  *  "_id": "58caaf0de194a90a3c980aa9",
  * "updated_at": "2017-03-16T15:28:13.072Z",
  * "created_at": "2017-03-16T15:28:13.072Z",
  * "email": "tamri@gmail.com",
  * "staus": "active",
  * "role": "admin",
  * "realm": "user"
 *  }
 */
router.post('/signup', user.createUser);

// POST /users/login
router.post('/login', auth.login);

// POST /users/logout
router.post('/logout', user.noop);

// GET /users/all
router.get('/all', user.getUsers);

// GET /users/:userId
router.get('/:_Id', user.getUser);

// PUT /users/:userId
router.put('/:_id', user.updateUser);

// DELETE /users/:userId
router.delete('/:_id', user.removeUser);

// Export Router
module.exports = router;
