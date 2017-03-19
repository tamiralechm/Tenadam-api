// Load Module Dependencies
var express = require('express');


var userRouter = require('./user');
var profileRouter = require('./profile');
var adminRouter = require('./admin');
var patientRouter = require('./patient');
var recommendationRouter = require('./recommendation');
var symptomRouter = require('./symptom');
var remedyRouter = require('./remedy');
var historyRouter=require('./history')

// Export Router Initializater
module.exports = function initRouter(app) {

  // Users Endpoint
  app.use('/users', userRouter);
  // Client Endpoint
  app.use('/patients', patientRouter);
  // Talent Endpoint
  app.use('/admins', adminRouter);
  // Profile Endpoint
  app.use('/profiles', profileRouter);
  // Project Endpoint
  app.use('/symptoms', symptomRouter);
  //message Endpoints
  app.use('/remedys', remedyRouter);
  //recommendation end Endpoints
  app.use('/recommendations', recommendationRouter);

  app.use('/historys', historyRouter);
};
