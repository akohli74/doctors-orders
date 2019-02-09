var express = require('express');
var router = express.Router();
var config = require('../config');

router.post('/', function(req, res, next) {
	var body = req.body;
	var userName = body.userName;
	var password = body.password;
});

module.exports = router;