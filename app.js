const express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    cors = require('cors'),
    compression = require('compression');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_DB_URL, () => {
    console.log('Mongodb Connected successfully!')
}).catch(e => console.error("Failed to connect to mongodb"));

const indexRoute = require('./routes/index.route'),
    studentRoute = require('./routes/student.route'),
    userRoute = require('./routes/user.route'),
    authRoute = require('./routes/auth.route'),
    authHelper = require('./helpers/auth.helper');

const app = express();

// middlewares
app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// routes 
app.use('/', indexRoute);
app.use(`/api/${config.API_VERSION}/auth`, authRoute);
app.use(`/api/${config.API_VERSION}/users`, userRoute);
app.use(`/api/${config.API_VERSION}/students`, studentRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(res.locals.message, res.locals.error);
    // return the error
    res.status(err.status || 500).send({error: err});

});

module.exports = app;
