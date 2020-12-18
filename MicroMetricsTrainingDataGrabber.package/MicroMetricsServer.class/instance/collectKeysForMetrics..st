accessing
collectKeysForMetrics: metricsCollection
	^ (metricsCollection flatCollect: [ :metric | metric keys ]) asSet asSortedCollection sortBlock: [ :metricName :anotherMetricName | metricName < anotherMetricName ]