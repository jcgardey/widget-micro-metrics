utilities-database
setupDatabase
	| repository |
	repository := VOMongoRepository
		host: 'localhost'
		database: 'uist2022'.
	repository enableSingleton