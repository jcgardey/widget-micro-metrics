initialization
initialize
	(WAAdmin register: self asApplicationAt: 'rater')
		addLibrary: JQDeploymentLibrary;
		addLibrary: JQUiDeploymentLibrary;
		addLibrary: TBSDeploymentLibrary;
		addLibrary: TBSJasnyDeploymentLibrary;
		addLibrary: RrwebLibrary;
		addLibrary: MicrometricsRaterLibrary;
		exceptionHandler: WADebugErrorHandler;
		preferenceAt: #resourceBaseUrl put: ('http://localhost:', MicroMetricsScriptsRunner new deploymentPort asString)