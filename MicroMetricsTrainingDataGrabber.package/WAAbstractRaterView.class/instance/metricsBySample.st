accessing
metricsBySample
	^ self microMetrics groupedBy: [ :metric | metric sampleId ]