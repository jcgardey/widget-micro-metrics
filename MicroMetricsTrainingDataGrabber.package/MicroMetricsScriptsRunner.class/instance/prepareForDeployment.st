api
prepareForDeployment
	RrwebLibrary setProductionBaseUrl.
	self
		setupDatabase;
		setDeploymentResourceBaseUrl;
		removeDebugger;
		stopServer;
		startServer.
	MicroMetricsServer
		resetInstance;
		instance