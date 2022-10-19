var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authenticateUser = require('./routes/authenticate')
var organisationRegister = require('./routes/organisationregister')
var checkEmailRouter = require('./routes/checkemail')
var userRegisterRouter = require('./routes/userregister');
var addEventRouter=require('./routes/addevent');
var getUserDetails = require('./routes/getuserdata')
var getUserEventDetails = require('./routes/getusereventsdata')
var usereventlist = require('./routes/usereventslisting')
var getmyeventsdata = require('./routes/getmyeventsdata')
var updateStatus = require('./routes/updateeventstatus')
var eventsRouter = require('./routes/events')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/checkemail', checkEmailRouter)
app.use('/authenticate', authenticateUser)
app.use('/organisationregister',organisationRegister)
app.use('/addevents',addEventRouter)
app.use('/getuserdata',getUserDetails)
app.use('/geteventdata',getUserEventDetails)
app.use('/geteventdata',getUserEventDetails)
app.use('/usereventslisting',usereventlist)
app.use('/getmyeventsdata',getmyeventsdata)
app.use('/userregister',userRegisterRouter)
app.use('/updateeventstatus',updateStatus)
app.use('/events',eventsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
