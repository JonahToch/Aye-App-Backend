var User = require('../models/users');
var Poop = require('../models/poop')

var async = require('async');

exports.index = function(req, res, next) {

    async.parallel({
        user_count: function(callback) {
            User.countDocuments({}, callback);
        },
        poop_count: function(callback) {
            Poop.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Aye App Backend Home', error: err, data: results });
        });
    }

exports.user_list = function(req, res) {
    res.json({ a: 1 });
};

exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};

exports.user_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User create POST');
};

exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};