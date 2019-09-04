as yet unclassified
prepareForDeployment
	self 
		setupDatabase;
		setDeploymentResourceBaseUrl;
		stopServer;
		startServer.
	MicroMetricsServer resetInstance; instance.