var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

const cors = require('cors');

app.use(cors({
    origin: '*'
}));
app.options('*', cors()) // Not sure if needed. According to https://expressjs.com/en/resources/middleware/cors.html
                         // This is already handled by above code but when I put this here it fixed a preflight error
                         // Could have just been that I put the cors portion above the other parts of the code though.
                         // Can't recreate for now so not sure.

var async = require('async');
var User = require('./models/users');
var Poop = require('./models/poop');
var Sesame = require('./models/sesame');

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

module.exports = app;
