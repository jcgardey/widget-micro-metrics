initialization
storeMetric: aMetric
	metrics removeAllSuchThat: [ :metric | metric id = aMetric id ].
	metrics add: aMetric.
	(MicroMetric selectMany: [ :metric | metric id = aMetric id ])
		do: [ :foundMetric | MicroMetric remove: foundMetric ].
	aMetric save