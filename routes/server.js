var getIP = require('external-ip')();
var express = require('express');
var router = express.Router();
var DB = require('../db');
var config = require('../config/config');

var database = new DB;

var publicIP;

getIP(function (err, ip) {
    if (err) {
    	console.log("Failed to retrieve IP address: " + err.message);
        throw err;
    }
    console.log("EHR Review running on " + ip + ":" + config.listeningPort);
    publicIP = ip;
});

router.get('/status', function(req, res, next) {
	var status = {
		"name": "EHR-Review",
		"version": 1.0
	}
	res.json(status);
});

router.get('/ip', function(req, res, next) {
	res.json({"ip": publicIP});
});

router.get('/config', function(req, res, next) {
	res.json(config.client);
})

module.exports = router;