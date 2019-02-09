var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

var util = require('util');
var querystring = require('querystring');
var config = require('./config.js');
var server = require('./routes/server');
var login = require('./routes/login');
var conditions = require('./routes/conditions');

app.locals.pretty = true;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

app.use('/', server);
app.use('/conditions', conditions);
app.use('/login', login);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

var port = process.env.PORT || config.listeningPort || 3000;
console.log("Listing on port " + port);

module.exports = app;

