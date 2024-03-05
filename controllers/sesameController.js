var https = require('https');
const axios = require('axios');
var async = require('async');
var Sesame = require('../models/sesame');
const {v4: uuidv4} = require('uuid');

exports.postSesameRouter = function (req, res) {
    if (req.body.sesameId) {
        createSesameController.createSesame(req, res);
    } else {
        res.status(400).json({
            status: 400,
            error: "Invalid body",
        })
    }
}


// ----------------- Start of functions ----------------

createSesameController = {

    createSesame(req, res) {

        var sesameId = req.body.sesameId;
        var userId = req.body.userId;

        if (sesameId.toUpperCase() === "NEW") {
            sesameId = uuidv4();

            var sesame = new Sesame({
                sesameId: sesameId,
                userId: null,
                group: null,
                config: null,
            });

            sesame.save(function (err) {
                if (err) {
                    res.status(400).json({
                        status: 400,
                        message: "Unable to create new sesameId",
                    })
                    return handleError(err);
                }
            });
            res.status(200).json({
                status: 200,
                message: "New sesameId created",
                sesame: sesame,
            });
            return;
        } else {
            Sesame.findOneAndUpdate({
                sesameId: sesameId,
            }, {
                userId: 'testasdfasdfas',
            }, {new: true}).then(updatedUser => {
                console.log('Updated user:', updatedUser);
                res.status(200).json({
                    status: 200,
                    message: "Updated user " + sesameId + ' with id ' + userId,
                })
            }).catch(error => {
                console.error('Error updating user:', error);
                res.status(400).json({
                    status: 400,
                    message: "Unable to update sesameId " + sesameId + " with " + userId,
                })
            });
        return;
        }

        res.status(400).json({
            status: 400,
            message: "Properly formatted request. But no action taken.",
        })

    },

};
// // ----------------- End of functions ----------------
//
//
// exports.openSesame = async function (req, res) {
//
//     try {
//
//         const url = 'http://205.178.91.213:60076/5/on';
//         // const timeoutTime = 10000;
//
//         const response = await axios.get(url);
//         // const response = await axios.get(url, {
//         //         timeout: timeoutTime,
//         //     }
//         // );
//
//         const responseBody = response.data;
//
//         res.json(responseBody);
//
//     } catch (error) {
//         console.error(error);
//         if (error.code === 'ECONNABORTED') {
//             res.status(500).json({error: 'Request timed out. Contact Gonah Software for assistance.'});
//         }
//
//         res.status(500).json({error: 'An error occurred while making the request. Contact Gonah Software for assistance.'});
//     }
// }
//
//
exports.getSesame = function (req, res) {
    Sesame.find({}, function (err, data) {
        if (err) {
            res.json('error');
            return console.error(err);
        } else {
            res.json(data);
        }
    })
};


