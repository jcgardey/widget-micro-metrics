accessing
cleanSelectMetrics
	| cleanMetrics selectMetrics |
	cleanMetrics := MicroMetricsServer instance metrics select: #consolidated.
	selectMetrics := cleanMetrics select: [ :metric | (metric valuesDictionary at: #widgetType) = 'SelectInput' ].
	^ selectMetrics