var DB = require('../db');
var config = require('../config/config');

module.exports = function(router, passport) {
	var database = new DB;

	function getCollection (collectionName, req, res) {
	  return database.connect()
	    .then(
	      function() {
	        return database.getCollection(collectionName);
	      },
	      function(err) {
	        throw("Failed to connect to the database: " + err);
	      })
	    .then(
	      function(records) {
	        return new Promise(function(resolve, reject) {
	          resolve({ req: req, res: res, records: records });
	        });
	      },
	      function(err) {
	        console.log("Failed to get the documents: " + err);
	        reject(req, res);
	        database.close();
	      })
	}


	router.get('/', function(req, res, next) {
		getCollection("conditions", req, res).then(function(conditions) {
	    	conditions.res.setHeader('Content-Type', 'application/json');
	        conditions.res.write(JSON.stringify(conditions.records));
	        conditions.res.end();
	    }).catch(function(err) {
	        console.log(err);
	    })
	});

}