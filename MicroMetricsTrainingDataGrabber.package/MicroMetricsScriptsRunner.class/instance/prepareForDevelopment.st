api
prepareForDevelopment
	RrwebLibrary setLocalBaseUrl.
	self
		setupDatabase;
		setDevelopmentResourceBaseUrl;
		stopServer;
		startDevelopmentServer.
	MicroMetricsServer
		resetInstance;
		instance