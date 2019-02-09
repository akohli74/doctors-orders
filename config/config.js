var config = {
	listeningPort: 3000,
	client: {
		mongodb: {
			defaultDatabase: "gyant",
			defaultUri: "mongodb://localhost:27017"
		},
	},
};

module.exports = config;