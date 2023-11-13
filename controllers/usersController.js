var User = require('../models/users');
var Poop = require('../models/poop')
var https = require('https');
const axios = require('axios');
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

// exports.user = function(req, res) {
//     if (req.query.type === 'isUsernameUnique') {
//         res.json({ a: 1 });
//     } else {
//         res.status(400).json({error: 'Invalid parameters.'});
//     }
// };


exports.isUsernameUnique = async function (req, res) {

    if (req.query.type !== 'isUsernameUnique') {
        res.status(400).json({error: 'Invalid parameters.'});
    }

    try {
        const headers = {
            'Authorization': 'Bearer ' + req.query.token,
        };

        const url = 'https://dev-mn6falogt3c14mat.us.auth0.com/api/v2/users?q=user_metadata.ayeUsername%3A%22'
        + req.query.username + '%22&search_engine=v3';

        const response = await axios.get(url, {
            headers: headers,
        });

        const responseBody = response.data;

        res.json(responseBody);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while making the request. Contact Gonah Software for assistance.'});
    }
}
