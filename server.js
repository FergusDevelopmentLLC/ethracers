
const express = require('express');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');

const firebase = require("firebase");
var config = {
  apiKey: "AIzaSyD2cj5V_-Ap9LsDOn1--9L5XKiiZkcSa-w",
  authDomain: "plugdj-v1.firebaseapp.com",
  databaseURL: "https://plugdj-v1.firebaseio.com",
  storageBucket: ""
};
firebase.initializeApp(config);

const app = express();
app.use(express.static(__dirname + "/public")); //allows serving of static files in public folder
app.use(express.static(__dirname + "/node_modules")); //allows serving of installed npm modules to front end

// middleware
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());

const racers = require('./routes/racers');
app.use('/racers', racers);

// catch 404 and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler function
app.use((req, res, next) => {

  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  //respond to the client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  //respond to console
  console.error(err);
});

// Start the server
const server = app.listen(9020, () => {
  console.log('App listening at port %s', server.address().port);
});
