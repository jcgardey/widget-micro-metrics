initialization
storeMetric: aMetric
	metrics removeAllSuchThat: [ :metric | metric id = aMetric id ].
	metrics add: aMetric