var MongoClient = require('mongodb').MongoClient;
var clientConfig = require('./config').client;

function DB() {
      this.db = null;
      this.dbo = null;
}

DB.prototype.connect = function() {

	var _this = this;

	return new Promise(function(resolve, reject) {
		if (_this.db) {
			resolve();
		} else {
			var __this = _this;
			
			MongoClient.connect(clientConfig.mongodb.defaultUri, { useNewUrlParser: true })
			.then(
				function(database) {
					__this.db = database;
					__this.dbo = database.db(clientConfig.mongodb.defaultDatabase);

					resolve();
				},
				function(err) {
					console.log("Error connecting: " + err.message);
					reject(err.message);
				}
			)
		}
	})
}

DB.prototype.close = function() {
	if (this.db) {
		this.db.close()
		.then(
			function() {},
			function(error) {
				console.log("Failed to close the database: " + error.message)
			}
		)	
	}
}

DB.prototype.getCollection = function(coll) {

	var _this = this;

	return new Promise(function (resolve, reject){
		_this.dbo.collection(coll).find({}).toArray(function(err, result) {
			if(err) reject(err.message);

			resolve(result);
		});
	})
}

// Make the module available for use in other files
module.exports = DB;
