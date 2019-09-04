accessing
addMetric: aMetric
	metrics removeAllSuchThat: [ :metric | metric id = aMetric id ].
	metrics add: aMetric.
	(MicroMetric selectMany: [ :metric | metric id = aMetric id ]) ifNotEmpty: [ :found | MicroMetric remove: found first ].
	aMetric save.