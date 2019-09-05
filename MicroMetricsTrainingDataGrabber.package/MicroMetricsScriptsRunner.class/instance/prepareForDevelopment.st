api
prepareForDevelopment
	RrwebLibrary setLocalBaseUrl.
	self
		setupDatabase;
		setDevelopmentResourceBaseUrl;
		stopServer;
		startServer.
	MicroMetricsServer
		resetInstance;
		instance