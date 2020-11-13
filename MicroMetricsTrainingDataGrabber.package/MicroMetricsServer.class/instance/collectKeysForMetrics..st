accessing
collectKeysForMetrics: metricsCollection
	^ (metricsCollection flatCollect: [ :metric | metric keys ]) asSet
	