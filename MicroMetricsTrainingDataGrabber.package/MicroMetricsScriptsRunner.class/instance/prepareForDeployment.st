api
prepareForDeployment
	RrwebLibrary setProductionBaseUrl.
	self
		setupDatabase;
		setDeploymentResourceBaseUrl;
		stopServer;
		startServer.
	MicroMetricsServer
		resetInstance;
		instance