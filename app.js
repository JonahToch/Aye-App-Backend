var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

var async = require('async');
var User = require('./models/users');
var Poop = require('./models/poop');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/aye';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Jonah, MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', apiRouter);

const cors = require('cors');

app.use(cors({
  origin: '*'
}));

//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// function userCreate(name, title) {
//   userDetail = {name: name, title: title}
//
//   var user = new User(userDetail);
//
//   user.save(function (err) {
//     if (err) {
//       console.log(err);
//       return
//     }
//     console.log('You created a new user:  ' + user);
//     return
//   } );
// }
//
// userCreate('Wonah', 'Master Commander');
//
// var query = User.find();
//
// query.select('name title');
//
// query.exec(function (err, users) {
//   if (err) return handleError(err);
//   console.log(users);
// })

// mongoose.connection.close();


module.exports = app;
