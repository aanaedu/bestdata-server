const express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  config = require('./config/config'),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_DB_URL, () => {
    console.log('Mongodb Connected successfully!')
});

const indexRoute = require('./routes/index.route'),
  studentRoute = require('./routes/student.route'),
  userRoute = require('./routes/user.route'),
  authRoute = require('./routes/auth.route'),
  authHelper = require('./helpers/auth.helper');

const app = express();

// middlewares 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// routes 
app.use('/', indexRoute);
app.use(`/api/${config.API_VERSION}/auth`, authRoute);

app.use(authHelper.ensureAuthenticated);

app.use(`/api/${config.API_VERSION}/users`, userRoute);
app.use(`/api/${config.API_VERSION}/students`, studentRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log(res.locals.message, res.locals.error)
  // return the error
  res.status(err.status || 500).send({error: err});

});

module.exports = app;
