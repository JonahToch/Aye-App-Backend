var https = require('https');
const axios = require('axios');
var async = require('async');

exports.openSesame = async function (req, res) {

    try {

        const url = 'http://205.178.91.213:60076/5/on';
        // const timeoutTime = 10000;

        const response = await axios.get(url);
        // const response = await axios.get(url, {
        //         timeout: timeoutTime,
        //     }
        // );

        const responseBody = response.data;

        res.json(responseBody);

    } catch (error) {
        console.error(error);
        if (error.code === 'ECONNABORTED') {
            res.status(500).json({error: 'Request timed out. Contact Gonah Software for assistance.'});
        }

        res.status(500).json({error: 'An error occurred while making the request. Contact Gonah Software for assistance.'});
    }
}