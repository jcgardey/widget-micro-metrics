running
setUp
	super setUp.
	server := MicroMetricsServer onPort: self portForTesting.
	server storeInMemory