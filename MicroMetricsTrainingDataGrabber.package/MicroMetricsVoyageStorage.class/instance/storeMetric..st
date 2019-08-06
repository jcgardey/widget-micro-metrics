storage
storeMetric: aMetric
	(MicroMetric selectMany: [ :metric | metric id = aMetric id ])
		do: [ :foundMetric | MicroMetric remove: foundMetric ].
	aMetric save