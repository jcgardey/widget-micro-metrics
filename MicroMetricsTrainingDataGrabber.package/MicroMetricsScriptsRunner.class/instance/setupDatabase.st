utilities-database
setupDatabase
	| repository |
	repository := VOMongoRepository host: 'localhost' database: 'micrometrics'.
	repository enableSingleton