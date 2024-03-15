var User = require('../models/users');
var Poop = require('../models/poop')
var https = require('https');
const axios = require('axios');
var async = require('async');

exports.index = function (req, res, next) {

    async.parallel({
        user_count: function (callback) {
            User.countDocuments({}, callback);
        },
        poop_count: function (callback) {
            Poop.countDocuments({}, callback);
        }
    }, function (err, results) {
        res.render('index', {title: 'Aye App Backend Home', error: err, data: results});
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

        // const url = 'https://dev-mn6falogt3c14mat.us.auth0.com/api/v2/users?q=user_metadata.ayeUsername%3A%22'
        // + req.query.username + '%22&search_engine=v3';

        const url = 'https://dev-mn6falogt3c14mat.us.auth0.com/api/v2/users';

        const response = await axios.get(url, {
            headers: headers,
        });

        const responseBody = response.data;

        for (let i = 0; i < responseBody.length; i++) {

            if (responseBody[i].user_metadata?.ayeUsername) {
                // console.log(responseBody[i].user_metadata?.ayeUsername);
                if (responseBody[i].user_metadata && responseBody[i].user_metadata.ayeUsername !== undefined &&
                    responseBody[i].user_metadata.ayeUsername.toLowerCase() === req.query.username.toLowerCase()) {
                    res.json(responseBody[i]);
                    return;
                }
            }
        }

        res.json([]);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while making the request. Contact Gonah Software for assistance.'});
    }
}

exports.getUserById = async function (req, res) {

    if (req.query.type !== 'getUserById') {
        res.status(400).json({error: 'Invalid parameters.'});
    }

    try {
        const headers = {
            'Authorization': 'Bearer ' + req.query.token,
        };

        const url = 'https://dev-mn6falogt3c14mat.us.auth0.com/api/v2/users/' + req.query.userId;
        // const url = 'https://dev-mn6falogt3c14mat.us.auth0.com/api/v2/users/auth0%7C65e174d4a54d24662c0b9725';



        const response = await axios.get(url, {
            headers: headers,
        });

        const responseBody = response.data;
        res.json(responseBody);
        // for (let i = 0; i < responseBody.length; i++) {
        //
        //     if (responseBody[i].user_metadata?.ayeUsername) {
        //         console.log('THE RESPONSE USERNAME IS ', responseBody[i].user_metadata?.ayeUsername);
        //         if (responseBody[i].user_metadata && responseBody[i].user_metadata.ayeUsername !== undefined) {
        //             res.json(responseBody[i]);
        //             return;
        //         }
        //     }
        // }
        //
        // res.json([]);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while making the request. Contact Gonah Software for assistance.'});
    }
}

exports.updateAyeUser = async function (req, res) {


    // console.log(req.body.ayeUser);
    // console.log(req);

    // res.json(req.headers['authorization']);

    const data = {
        user_metadata: {
            "bio": req.body.bio,
        }
    }

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkxKbFpSSmdXTnFMTEV6cVR3SnR3ZCJ9.eyJpc3MiOiJodHRwczovL2Rldi1tbjZmYWxvZ3QzYzE0bWF0LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJRQTlTQXZqWjdQUngyMENxdDVTaTVPTGZMbjRXUmVRcUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtbW42ZmFsb2d0M2MxNG1hdC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcwMjQ1MDg4MywiZXhwIjoxNzAyNTM3MjgzLCJhenAiOiJRQTlTQXZqWjdQUngyMENxdDVTaTVPTGZMbjRXUmVRcSIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zX3N1bW1hcnkgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOnNjaW1fY29uZmlnIGNyZWF0ZTpzY2ltX2NvbmZpZyB1cGRhdGU6c2NpbV9jb25maWcgZGVsZXRlOnNjaW1fY29uZmlnIGNyZWF0ZTpzY2ltX3Rva2VuIHJlYWQ6c2NpbV90b2tlbiBkZWxldGU6c2NpbV90b2tlbiBkZWxldGU6cGhvbmVfcHJvdmlkZXJzIGNyZWF0ZTpwaG9uZV9wcm92aWRlcnMgcmVhZDpwaG9uZV9wcm92aWRlcnMgdXBkYXRlOnBob25lX3Byb3ZpZGVycyBkZWxldGU6cGhvbmVfdGVtcGxhdGVzIGNyZWF0ZTpwaG9uZV90ZW1wbGF0ZXMgcmVhZDpwaG9uZV90ZW1wbGF0ZXMgdXBkYXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6ZW5jcnlwdGlvbl9rZXlzIHJlYWQ6ZW5jcnlwdGlvbl9rZXlzIHVwZGF0ZTplbmNyeXB0aW9uX2tleXMgZGVsZXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOmNsaWVudF9jcmVkZW50aWFscyBjcmVhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIHVwZGF0ZTpjbGllbnRfY3JlZGVudGlhbHMgZGVsZXRlOmNsaWVudF9jcmVkZW50aWFscyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.BJzY6f4-XLO-lRrX2TjqxuuKxkp-wTusrF_WamaCWuQ-Qox6UlJ0K3mTfF9cWl1K5FB9hSNspMgJKJfwO-fkVXhn6l__OjU3xWAmuC8QusOEA7ak3wP_VyE7mACyhrxE1KCY_7Kal3UH_HRv8aPRFywV8pntnh1D3g3VU6JzDjQXmpaZDuHC_L7EgZwTErDdJ9nkPYIwjst6XA_QkfhcLik4S1bs61bpNvD3N1Nh_U7OWu0uynsfIjf6EsrPcJ9SXPL7uVcz4uJwxH6rENbDGOIACEquFRKyksrR85QG5b_2CcUJYMhN8M2o9ATcQjEzdD4JNxL-XEmIP6c_2nGnVw',
        };

        const url = req.body.updateUrl;

        const response = await axios.patch(url, data, {
            headers: headers,
        });

        const responseBody = response.data;

        res.json(responseBody);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred while making the request. Contact Gonah Software for assistance.'});
    }
}