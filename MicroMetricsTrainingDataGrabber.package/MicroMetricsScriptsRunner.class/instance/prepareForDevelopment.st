as yet unclassified
prepareForDevelopment
	self 
		setupDatabase;
		setDevelopmentResourceBaseUrl;
		stopServer;
		startServer.
	MicroMetricsServer resetInstance; instance.